import React, {Component} from 'react'
import {NODE_WIDTH, NODE_HEIGHT, GRID_SIZE} from '../../constants/ViewConstants';
import className from 'classnames';
import Badge from './Badge';
import Button from './Button';
import Icon from './Icon';
import Inputs from './Inputs';
import Outputs from './Outputs';
import Label from './Label';
import Status from './Status'; 


/*
return <g {...gprops}>
                    <Button d={d}/>
                    {mainrect}
                    <Label d={d}/>
                    <Badge d={d}/>

                    <Icon d={d}/>
                    <Inputs d={d}/>
                    <Outputs d={d}/>
                    <Status d={d}/>
                </g> */

class D3Node extends Component {
	
	constructor(props){
		super(props);	

		this._nodeMouseDown =	this.props.nodeMouseDown.bind(this);
		this._nodeDoubleClicked = this.props.nodeDoubleClicked.bind(this);
		this._nodeTouchStart = this.props.nodeTouchStart.bind(this);
		this._nodeTouchEnd = this.props.nodeTouchEnd.bind(this);
		this._nodeMouseEnter = this.props.nodeMouseEnter.bind(this);
		this._nodeMouseLeave = this.props.nodeMouseLeave.bind(this);
	}

    //shouldComponentUpdate(nextProps, nextState){
    //    return true;//this.props.x != nextProps.x && this.props.y != nextProps.y;
   //}

    render(){
    

        const {d,selected} = this.props;
        
        
        const mainrectclass= className({
            node: true,
            unknown: d.type == "unknown",
            node_selected: selected,
            node_highlighted: d.highlighted,
        });

        const mainrectprops = {
            fill:  d._def.color,
            width: d.w,
            height: d.h,
            onDoubleClick: this._nodeDoubleClicked.bind(this,d),
            onMouseDown: this._nodeMouseDown.bind(this,d),

        };

        const mainrect =  <rect className={mainrectclass} {...mainrectprops}></rect>
        let gprops = {
            id: this.props.id,
            transform: `translate(${(d.x-d.w/2)},${(d.y-d.h/2)})`,
        }

        let textprops = {
                y: 35,
                x: 25,
                fontFamily: 'FontAwesome',
                fontSize: '30px',
                fill: 'white',
                textAnchor: 'middle',
        }
        
        let icontxt = d._def.unicode || '\uf040'
        
        return <g {...gprops}>
                  {mainrect}
                    <text {...textprops}>{icontxt}</text>
                    <Inputs d={d}/>
                    <Outputs d={d}/>
                </g>
        
    }
}

export default D3Node;