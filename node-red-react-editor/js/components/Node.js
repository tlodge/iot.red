import React, {PropTypes, Component} from 'react';
import className from 'classnames';
import { DragSource } from 'react-dnd';


 /*return  connectDragSource(<div onClick={this._handleClick.bind(this,def,nt)} className="palette_node" id={`pallete_node${nodeTypeId}`} style={{style, ...opacity}}>
                    <div className={labelClass}>{label}</div>
                    {iconContainer}  
                    {portOut}
                    {portIn}
                </div>);*/

const ItemTypes = {
  BOX: 'box'
};

const boxSource = {

  beginDrag(props) {
    return {
      name: props.nt
    };
  },

  endDrag(props, monitor) {
    //what's the simplest way to figure out whether this is a legal drop or not?
    const {nt, def, reducer} = props;
    const {x,y} = monitor.getClientOffset();
    props.handleDrop(reducer, nt, def, x, y);
  }
};

function connect(connect, monitor){
    
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
};

class Node extends Component {
	
    constructor(props){
        super(props);
        this._escapeNodeType = this._escapeNodeType.bind(this);
        this._handleClick = this._handleClick.bind(this);
        
        
        //this.exclusion = ['config','unknown','deprecated'];
        //this.core = ['subflows', 'input', 'output', 'function', 'social', 'mobile', 'storage', 'analysis', 'advanced'];
    }

    _escapeNodeType(nt) {
        return nt.replace(" ","_").replace(".","_").replace(":","_");
    }

    _handleClick(def,nt){
        console.log("clicked a node");
        console.log(nt);
        console.log(def);
        console.log("--------------");
    }

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        //nt: PropTypes.string.isRequired
    }

    render() {
	    const { isDragging, connectDragSource } = this.props;
        const { name } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        let nt  = this.props.nt;
        let def = this.props.def;

        let nodeTypeId   = this._escapeNodeType(nt);
        let category     = def.category.replace(" ","_");
        let rootCategory = category.split("-")[0];
        let label = /^(.*?)([ -]in|[ -]out)?$/.exec(nt)[1];

        let nodeprops = {
            type: nt,
        }

        let labelClass = className({
            pallete_label: true,
            pallete_label_right: def.align === "right",
        })

        let style = {
            backgroundColour: def.color,
        }
            
        if (typeof def.paletteLabel !== "undefined") {
            try {
                label = (typeof def.paletteLabel === "function" ? def.paletteLabel.call(def) : def.paletteLabel)||"";
            } catch(err) {
                console.log(`Definition error: ${def.name}.paletteLabel`,err);
            }
        }

        let iconContainer;

        if (def.icon) {
            let icon_url = "arrow-in.png";
            try {
                icon_url = (typeof def.icon === "function" ? def.icon.call({}) : def.icon);
            } catch(err) {
                console.log(`Definition error: ${nt}.icon`,err);
            }
            
            let iconcontainerclass = className({
                palette_icon_container : true,
                palette_icon_container_right: def.align === "right",
            });

            let iconstyle = {
                backgroundImage : `url(icons/${icon_url})`,
            }

            iconContainer = <div className={iconcontainerclass}>
                                    <div className="palette_icon" style={iconstyle}/>
                                </div>
        }

        let portOut;
        let portIn;

        if (def.outputs > 0) {
            portOut = <div className="palette_port palette_port_output"/>
        }

        if (def.inputs > 0) {
            portIn = <div className="palette_port palette_port_input"/>
        }

        let labelstyle = {
            paddingTop:10,
            paddingBottom: 20,

        }

        let container = {
            display: 'flex',
            display: '-webkit-box',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: '-webkit-flex',
            WebkitFlexFlow: 'column',
            flexFlow: 'column',
            textAlign: 'center',
            width: 178,
        }

        let iconstyle = {
            alignSelf: 'center',
            height: '4em',
            width: '4em',
            color:'white',
            fontWeight: 'regular',
            background: def.color || '#ca2525',
            border: '2px solid white', 
            lineHeight: '5.5em',
            textAlign: 'center',
            boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.9), 0 6px 20px 0 rgba(0, 0, 0, 0.09)',
            color: '#445662',
        }


        let icon = def.icon || 'fa-bug';

        let draggable = connectDragSource( <div style={iconstyle}><i className={`fa ${icon} fa-3x fa-fw`}></i></div>);

        return              (<div style={container} onClick={this._handleClick.bind(this,def,nt)}>
                                   {draggable}
                                    <div style={labelstyle}>{label}</div>
                                </div>)
       
	}
}

export default DragSource(ItemTypes.BOX, boxSource, connect)(Node);