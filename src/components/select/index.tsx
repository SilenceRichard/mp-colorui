import { Picker, View } from '@tarojs/components';
import Taro, { useState } from '@tarojs/taro';
import { getNowDate } from '../utils/index';
import { IProps } from '../../../@types/select';



function ClSelect(props: IProps) {
  const selector = {
    range: (props.selector && props.selector.range) || [],
    value: (props.selector && props.selector.value) || 0,
    rangeKey: (props.selector && props.selector.rangeKey) || undefined
  };
  const mutiSelector = {
    range: (props.multiSelector && props.multiSelector.range) || [],
    value: (props.multiSelector && props.multiSelector.value) || [0, 0],
    rangeKey: (props.multiSelector && props.multiSelector.rangeKey) || undefined
  };
  const timeSelector = {
    value: (props.time && props.time.value) || '00:00',
    start: (props.time && props.time.start) || '00:00',
    end: (props.time && props.time.end) || '23:59'
  };
  const dateSelector = {
    value:
      (props.date && props.date.value) ||
      getNowDate((props.date && props.date.fields) || 'day'),
    fields: (props.date && props.date.fields) || 'day',
    start: (props.date && props.date.start) || '',
    end: (props.date && props.date.end) || ''
  };
  const regionSelector = {
    value: (props.region && props.region.value) || [
      '北京市',
      '北京市',
      '东城区'
    ],
    customItem: (props.region && props.region.customItem) || ''
  };

  // 单选
  const getSelectorValue = index =>
    selector.rangeKey
      ? selector.range[index][selector.rangeKey]
      : selector.range[index];
  const [selected, setSelected] = useState(() =>
    getSelectorValue(selector.value)
  );
  const setSelect = index => {
    const value: string = getSelectorValue(index);
    setSelected(value);
  };
  // 多选
  const getMutiSelectorValue = mutiIndex => {
    const value: any[] = [];
    mutiSelector.range.forEach((item, index) => {
      const rangeValue = mutiIndex[index];
      const temp = mutiSelector.rangeKey
        ? item[rangeValue][mutiSelector.rangeKey]
        : item[rangeValue];
      value.push(temp);
    });
    return value.join('，');
  };
  const [mutiSelected, setMutiSelected] = useState(() =>
    getMutiSelectorValue(mutiSelector.value)
  );
  const setMutiSelect = index => {
    setMutiSelected(getMutiSelectorValue(index));
  };
  // 时间选择
  const getTimeSelectorValue = value => value;
  const [timeSelected, setTimeSelected] = useState(() =>
    getTimeSelectorValue(timeSelector.value)
  );
  const setTimeSelect = value => {
    setTimeSelected(getTimeSelectorValue(value));
  };
  // 日期选择
  const getDateSelectorValue = value => value;
  const [dateSelected, setDateSelected] = useState(() =>
    getDateSelectorValue(dateSelector.value)
  );
  const setDateSelect = value => {
    setDateSelected(getDateSelectorValue(value));
  };
  // 地区选择
  const getRegionSelectorValue = value => value.join('，');
  const [regionSelected, setRegionSelected] = useState(() =>
    getRegionSelectorValue(regionSelector.value)
  );
  const setRegionSelect = value => {
    setRegionSelected(getRegionSelectorValue(value));
  };

  // 单选触发
  const onSelectorChange = (e: any) => {
    const index = e.detail.value;
    setSelect(index);
    props.onChange && props.onChange(index);
  };
  // 多选触发
  const onMutiSelectorChange = (e: any) => {
    const index = e.detail.value;
    setMutiSelect(index);
    props.onChange && props.onChange(index);
  };
  // 多选滚动触发
  const onMutiSelectorColumChange = (e: any) => {
    props.onColumnChange && props.onColumnChange(e.detail);
  };
  // 时间触发
  const onTimeSelectorChange = (e: any) => {
    const index = e.detail.value;
    setTimeSelect(index);
    props.onChange && props.onChange(index);
  };
  // 日期触发
  const onDateSelectorChange = (e: any) => {
    const index = e.detail.value;
    setDateSelect(index);
    props.onChange && props.onChange(index);
  };
  const onCancel = (e: any) => {
    props.onCancel && props.onCancel(e);
  };
  // 地区触发
  const onRegionSelectorChange = (e: any) => {
    const detail = e.detail;
    setRegionSelect(detail.value);
    props.onChange && props.onChange(detail);
  };

  // 单选组件
  const selectorComponent = (
    <Picker
      mode='selector'
      range={selector.range}
      rangeKey={selector.rangeKey}
      value={selector.value || 0}
      onChange={onSelectorChange}
      onCancel={onCancel}
      disabled={props.disabled}
    >
      <View className='picker'>{selected}</View>
    </Picker>
  );
  // 多选组件
  const mutiSelectorComponent = (
    <Picker
      mode='multiSelector'
      range={mutiSelector.range}
      rangeKey={mutiSelector.rangeKey}
      value={mutiSelector.value}
      onChange={onMutiSelectorChange}
      onColumnChange={onMutiSelectorColumChange}
      onCancel={onCancel}
      disabled={props.disabled}
    >
      <View className='picker'>{mutiSelected}</View>
    </Picker>
  );
  // 时间选择组件
  const timeSelectorComponent = (
    <Picker
      mode='time'
      value={timeSelector.value}
      start={timeSelector.start}
      end={timeSelector.end}
      onChange={onTimeSelectorChange}
      onCancel={onCancel}
      disabled={props.disabled}
    >
      <View className='picker'>{timeSelected}</View>
    </Picker>
  );
  // 日期选择组件
  const dateSelectorComponent = (
    <Picker
      mode='date'
      value={dateSelector.value}
      start={dateSelector.start}
      end={dateSelector.end}
      fields={dateSelector.fields}
      onCancel={onCancel}
      onChange={onDateSelectorChange}
    >
      <View className='picker'>{dateSelected}</View>
    </Picker>
  );
  // 地区选择组件
  const regionSelectorComponent = (
    <Picker
      mode='region'
      value={regionSelector.value}
      customItem={regionSelector.customItem}
      onChange={onRegionSelectorChange}
      onCancel={onCancel}
      disabled={props.disabled}
    >
      <View className='picker'>{regionSelected || '123'}</View>
    </Picker>
  );

  const title = props.title;
  return (
    <View className={`cu-form-group ${props.disabled ? 'text-gray' : ''}`}>
      <View className='title'>{title || ''}</View>
      {props.mode === 'selector' ? selectorComponent : ''}
      {props.mode === 'multiSelector' ? mutiSelectorComponent : ''}
      {props.mode === 'time' ? timeSelectorComponent : ''}
      {props.mode === 'date' ? dateSelectorComponent : ''}
      {props.mode === 'region' ? regionSelectorComponent : ''}
    </View>
  );
}

ClSelect.options = {
  addGlobalClass: true
};
ClSelect.defaultProps = {
  mode: 'selector',
  selector: [],
  multiSelector: [],
  time: [],
  date: [],
  region: []
} as IProps;
export default ClSelect;
