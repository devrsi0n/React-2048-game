import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import styles from './ranking.scss';
import i18n from '../../utils/i18n';

const option = {
  title: {
    text: i18n.chartTitle,
    subtext: i18n.chartSubTitle
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: [] // name
  },
  series: {
    type: 'bar',
    data: [] // score
  }
};

export class Rank extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        html_url: PropTypes.string,
        name: PropTypes.string,
        avatar_url: PropTypes.string,
        score: PropTypes.number
      })
    ).isRequired,
    onGetRankingList: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);

    this.isLoad = false;
  }

  componentWillMount() {
    this.props.onGetRankingList();
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') {
      this.chart = echarts.init(document.getElementById('echarts'));
      this.chart.showLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV !== 'test') {
      if (!this.isLoad) {
        this.chart.hideLoading();
        this.isLoad = true;
      }
      const { list } = nextProps;
      const names = [];
      const scores = [];
      list.reverse().forEach(item => {
        names.push(item.name);
        scores.push(item.score);
      });
      option.yAxis.data = names;
      option.series.data = scores;
      this.chart.setOption(option);
    }
  }

  render() {
    return (
      <div className={styles.main}>
        <div id="echarts" className={styles.echarts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.present.ranking.list
});

const mapDispatchToProps = dispatch => ({
  onGetRankingList: () => dispatch({ type: 'GET_RANKLING_LIST' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
