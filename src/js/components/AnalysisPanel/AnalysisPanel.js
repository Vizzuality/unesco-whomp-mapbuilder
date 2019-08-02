import Instructions from 'components/AnalysisPanel/Instructions';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import Upload from 'components/AnalysisPanel/Upload';
import Analysis from 'components/AnalysisPanel/Analysis';
import analysisKeys from 'constants/AnalysisConstants';
import layerActions from '../../actions/LayerActions';
import MapStore from '../../stores/MapStore';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };
  
  constructor(props){
    super(props);
    this.state = {
      ...MapStore.getState()
    };
  }
 
  
  // getSelectedFeatureTitles = () => {
  //   const {map} = this.context;
  //   let selectedFeats;
  //   const selectedFeatureTitlesArray = [];
  //   if (map.infoWindow && map.infoWindow.getSelectedFeature()) {
  //     selectedFeats = map.infoWindow.features;
  //     selectedFeats.forEach(selectedFeat => selectedFeatureTitlesArray.push(selectedFeat._layer.infoTemplate.title(selectedFeat)));
  //     layerActions.updateSelectedFeatureTitles.defer(selectedFeatureTitlesArray);
  //   }
  //   console.log('selectedFeatureTitlesArray', selectedFeatureTitlesArray);
  // };
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
    //this.getSelectedFeatureTitles();
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  render () {
    const {map} = this.context;
    let selectedFeature, selectedFeats;
    let content;
    
    //console.log('selected feature titles!!!', this.state.selectedFeatureTitles);

    //- Infer the selected feature from the info window
    if (map.infoWindow && map.infoWindow.getSelectedFeature()) {
      selectedFeats = map.infoWindow.features;
      selectedFeature = map.infoWindow.getSelectedFeature();
    }
    

    if (selectedFeature !== undefined &&
      selectedFeature.geometry &&
      selectedFeature.geometry.type === analysisKeys.GEOMETRY_POLYGON
    ) {
      content = <Analysis selectedFeature={selectedFeature} selectedFeats={selectedFeats} {...this.props} />;
    } else {
      content = [<Instructions key='instructions' />, <DrawTools key='tools' />, <Upload key='upload'/>];
    }

    return (
      <div className='analysis-panel custom-scroll relative'>
        {content}
      </div>
    );
  }

}
