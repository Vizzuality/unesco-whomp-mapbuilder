import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import {attributes} from 'constants/AppConstants';
import text from 'js/languages';
import SVGIcon from 'utils/svgIcon';
import {defaultColorTheme} from '../../config';
import mapActions from '../../actions/MapActions';
import MapStore from '../../stores/MapStore';

import React, {
  Component,
  PropTypes
} from 'react';

let layersCategories = {};

export default class InfoWindow extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSelectedFeature: '',
      prevButtonHover: false,
      nextButtonHover: false,
      ...MapStore.getState()
    };
  }
  
  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }
  
  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectIndex !== -1 && this.state.selectIndex === -1) {
      this.setState({
          activeSelectedFeature: ''
        });
      mapActions.updateSelectIndex.defer(0);
    }
    
    if ((this.context.map && this.context.map.infoWindow && this.context.map.infoWindow.features && prevState.activeSelectedFeature === '')) {
      const features = this.context.map.infoWindow.features;
      layersCategories = {};
      features.forEach(feature => {
        if (layersCategories[feature._layer.name]) {
          layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
          layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
        } else {
          layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
        }
      });
      const layersKeys = Object.keys(layersCategories);
      const firstFeature = layersCategories[layersKeys[0]];
      const activeSelectedFeature = `{"name": "${firstFeature.name}", "count": "${firstFeature.count}", "featuresList": "${firstFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`;
      this.setState({
        activeSelectedFeature
      });
    }
  }

  previous = () => {
    const features = this.context.map.infoWindow.features;
    const currentSelectedFeature = this.context.map.infoWindow.getSelectedFeature();
    const matchedFeature = features.filter(feature => feature === currentSelectedFeature)[0];
    const currentIndex = features.indexOf(matchedFeature);
    this.context.map.infoWindow.select(currentIndex);
    const newSelectedFeature = layersCategories[matchedFeature._layer.name];
    this.setState({
      activeSelectedFeature: `{"name": "${newSelectedFeature.name}", "count": "${newSelectedFeature.count}", "featuresList": "${newSelectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    });
    mapActions.decreaseSelectIndex();
  };

  next = () => {
    
    const currentSelectedFeature = this.context.map.infoWindow.getSelectedFeature();
    
    const features = this.context.map.infoWindow.features;
    const matchedFeature = features.filter(feature => feature === currentSelectedFeature)[0];
    const currentIndex = features.indexOf(matchedFeature);
    this.context.map.infoWindow.select(currentIndex);
    const newSelectedFeature = layersCategories[matchedFeature._layer.name];
    this.setState({
      activeSelectedFeature: `{"name": "${newSelectedFeature.name}", "count": "${newSelectedFeature.count}", "featuresList": "${newSelectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
    });
    mapActions.increaseSelectIndex();
  };

  clearFeatures = () => {
    const {map} = this.context;
    const features = map.infoWindow.features;
    const currentSelectedFeature = map.infoWindow.getSelectedFeature();
    const matchedFeature = features.filter(feature => feature === currentSelectedFeature)[0];
    const currentIndex = features.indexOf(matchedFeature);
    const newFeatures = [
      ...features.slice(0, currentIndex),
      ...features.slice(currentIndex + 1)
    ];
    layersCategories = {};
    newFeatures.forEach(feature => {
      if (layersCategories[feature._layer.name]) {
        layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
        layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
      } else {
        layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
      }
    });
    if (newFeatures.length > 0) {
      const newFeature = newFeatures[currentIndex - 1] ? newFeatures[currentIndex - 1] : newFeatures[0];
      const newFeatureName = newFeature._layer.name;
      const newSelectedFeature = layersCategories[newFeatureName];
      map.infoWindow.clearFeatures();
      map.infoWindow.hide();
      map.infoWindow.setFeatures(newFeatures);
      map.infoWindow.show();
      map.infoWindow.select(newFeatures.indexOf(newFeature));
      this.setState({
        activeSelectedFeature: `{"name": "${newSelectedFeature.name}", "count": "${newSelectedFeature.count}", "featuresList": "${newSelectedFeature.featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`
      });
      if (this.state.selectIndex > 0) {
        mapActions.decreaseSelectIndex();
      }
    } else {
      map.infoWindow.clearFeatures();
      this.setState({
        activeSelectedFeature: ''
      });
      mapActions.updateSelectIndex(0);
    }
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={`step-${index + 1}`}>{instruction}</li>
    );
  };

  changeSelectedFeature = evt => {
    const features = this.context.map.infoWindow.features;
    const selectedFeature = JSON.parse(evt.target.value);
    const name = selectedFeature.name;
    const layerCategory = layersCategories[name];
    const index = features.indexOf(layerCategory.featuresList[0]);
    this.context.map.infoWindow.select(index);
    this.setState({
      activeSelectedFeature: evt.target.value
    });
    mapActions.updateSelectIndex(0);
  };
  
  prevToggleHover = () => {
    this.setState({
      prevButtonHover: !this.state.prevButtonHover
    });
  };
  
  nextToggleHover = () => {
    this.setState({
      nextButtonHover: !this.state.nextButtonHover
    });
  };

  selectedFeatureOption = (key, index, layers) => {
    return (
      <option
        value={`{"name": "${layers[key].name}", "count": "${layers[key].count}", "featuresList": "${layers[key].featuresList.map(feature => feature.attributes[feature._layer.objectIdField]).join()}"}`}
        key={`selected-feature-${index}`}
      >
        {`${layers[key].name} (${layers[key].count})`}
      </option>
    );
  };

  createDropdown = () => {
    const { customColorTheme } = this.context.settings;
    const { prevButtonHover, nextButtonHover, activeSelectedFeature, selectIndex } = this.state;
    const features = this.context.map.infoWindow.features;
    layersCategories = {};
    features.forEach(feature => {
      if (layersCategories[feature._layer.name]) {
        layersCategories[feature._layer.name].count = layersCategories[feature._layer.name].count + 1;
        layersCategories[feature._layer.name].featuresList = [...layersCategories[feature._layer.name].featuresList, feature];
      } else {
        layersCategories[feature._layer.name] = {name: feature._layer.name, count: 1, featuresList: [feature]};
      }
    });
    const layersKeys = Object.keys(layersCategories);
    const selectedFeature = this.context.map.infoWindow.getSelectedFeature();
    return (
      <div className="relative infoWindow__select-container">
        <select className='infoWindow__select' onChange={this.changeSelectedFeature} value={activeSelectedFeature}>
          {features && features.length ? layersKeys.map((key, index) => this.selectedFeatureOption(key, index, layersCategories)) : null}
        </select>
        <div
          style={{color: `${customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme}`}}
          className='infoWindow__select-arrow'
        />
        <div className="infoWindow__prev-next-container">
          <span
            style={prevButtonHover ? { backgroundColor: `${selectIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`, opacity: `${selectIndex > 0 ? '0.8' : '1'}` } :
              { backgroundColor: `${selectIndex > 0 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}` }}
            className={`fa-button color arrow prev ${selectIndex > 0 ? '' : 'disabled'}`}
            onClick={selectIndex > 0 ? this.previous : null}
            onMouseEnter={this.prevToggleHover}
            onMouseLeave={this.prevToggleHover}
          >
            Prev
          </span>
          <span
            style={nextButtonHover ? { backgroundColor: `${selectIndex < layersCategories[selectedFeature._layer.name].count - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}`, opacity: `${selectIndex < layersCategories[selectedFeature._layer.name].count - 1 ? '0.8' : '1'}` } :
              { backgroundColor: `${selectIndex < layersCategories[selectedFeature._layer.name].count - 1 ? (customColorTheme && customColorTheme !== '' ? customColorTheme : defaultColorTheme) : '#eee'}` }}
            className={`fa-button color arrow next ${selectIndex < layersCategories[selectedFeature._layer.name].count - 1 ? '' : 'disabled'}`}
            onClick={selectIndex < layersCategories[selectedFeature._layer.name].count - 1 ? this.next : null}
            onMouseEnter={this.nextToggleHover}
            onMouseLeave={this.nextToggleHover}
          >
            Next
          </span>
        </div>
      </div>
    );
  };

  render () {
    const {infoWindow} = this.context.map;
    const {language} = this.context;
    const {selectIndex} = this.state;
    let selectedFeature, content, title, footer, dropdown, features;
    const {editingEnabled} = this.props;
    
    if ( infoWindow && infoWindow.getSelectedFeature ) {
      selectedFeature = infoWindow.getSelectedFeature();
      content = infoWindow._contentPane.innerHTML;
      features = infoWindow.features;
    }
    
    if (selectedFeature) {
      if (selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_SEARCH) {
        title = (
          <div className='infoWindow__title custom-scroll'>
            {selectedFeature.infoTemplate.title}
          </div>
        );
      }
      //- For Drawn Features, Give them a Control which can rename or delete the feature
      if (selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_DRAW ||
        selectedFeature.attributes && selectedFeature.attributes.source && selectedFeature.attributes.source === attributes.SOURCE_UPLOAD
      ) {
        title = (
          <div className='infoWindow__title custom-scroll'>
            <CustomFeatureControl feature={selectedFeature} editingEnabled={editingEnabled} />
          </div>
        );
      }
      // Add the footer
      footer = (
        <div className='infoWindow__footer'>
          <ReportSubscribeButtons />
        </div>
      );
      
      // Add the dropdown for multiple selected features
      dropdown = this.createDropdown();
    }    
    
    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <svg onClick={this.clearFeatures} className='infoWindow__clearFeatures-icon pointer-custom'>
              <SVGIcon id={'shape-close'} />
            </svg>
            {selectedFeature && selectedFeature.attributes && selectedFeature.attributes.source === 'draw' ? null : dropdown}
          </div>
          <div className="infoWindow__count">
            {layersCategories && selectedFeature && selectedFeature._layer && selectedFeature._layer.name && layersCategories[selectedFeature._layer.name] ?
            `${selectIndex + 1} / ${layersCategories[selectedFeature._layer.name].count}` : null}
          </div>
          <div className="infoWindow__title custom-scroll">
            <div dangerouslySetInnerHTML={{__html: content }} />
          </div>
          <div className='infoWindow__attribute-display custom-scroll'>
            {title}
          </div>
        </div>
        <div className={`infoWindow__instructions ${selectedFeature ? 'hidden' : ''}`}>
          <h4 className='analysis-instructions__header'>
            {text[language].INFO_WINDOW_INSTRUCTION_HEADER}
          </h4>
          <ol className='analysis-instructions__olist'>
            {text[language].INFO_WINDOW_INSTRUCTION_LIST.map(this.renderInstructionList)}
          </ol>
          <div className='analysis-instructions__draw-icon-container'>
            <svg className='analysis-instructions__draw-icon'>
              <SVGIcon id={'icon-analysis-poly'} />
            </svg>
          </div>
        </div>
        {footer}
      </div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
