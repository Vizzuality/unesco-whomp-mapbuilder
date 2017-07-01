import Request from 'utils/request';
import MapStore from 'stores/MapStore';
import React from 'react';

export default class FiresLegend extends React.Component {

  constructor (props) {
    super(props);
    const {currentLayer} = MapStore.getState();
    this.state = { legendInfos: [], currentLayer: currentLayer };
  }

  storeDidUpdate = () => {
    const {currentLayer} = MapStore.getState();
    if(currentLayer === null) return;
    this.setState({currentLayer: currentLayer});
  };

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);

    const map = this.props.map;
    const layer = map.getLayer(this.props.layerId);
    
    Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  itemMapper (item, index) {
    return (
      <div className='legend-row' key={index}>
        <img className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label' key={index}>{item.label}</div>
      </div>
    );
  }

  render () {
    let bool;
    if(this.state.currentLayer === null) {
      bool = false;
    } else {
      bool = this.state.currentLayer.visible ? '' : 'hidden';
    }
    
    return (
      <div className={`legend-container  ${bool}`} ref="myRef">
        {this.state.legendInfos.length === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.state.legendInfos.map(this.itemMapper, this)}
          </div>
        }
      </div>
    );
  }
}
