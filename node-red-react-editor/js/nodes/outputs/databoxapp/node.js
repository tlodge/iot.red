import React from 'react';
import composeNode from '../../../utils/composeNode';

class Node extends React.Component {

       render() {
          const {selected} = this.props;
          return  <h1> It is me ${selected.id} </h1>
          
       }
}

export default composeNode(Node, 'databox app', 
                            {
                                category: 'outputs',      
                                color: '#d45500',
                                defaults: {             
                                    name: {value:""},   
                                    topic: {value:"", required:true}
                                },
                                inputs:1,               
                                outputs:0,             
                               
                                icon: "fa-mobile", 
                                unicode: '\uf10b',       
                                label: function() {     
                                    return this.name||this.topic||"media player";
                                },
                                
                                description: "<p>The databox app is the standard messaging endpoint for users in a household.</p>  The <code>msg.payload</code> must be formatted as a json object with values <p> <code>{ contenttype: [numeric, table, html], content: [your content]}</code></p> <p> Where there are multiple companion apps associated with a databox, the message will be sent to the owner or owners of the datastore(s) used in your flow </p>", 

                                labelStyle: function() { 
                                    return this.name?"node_label_italic":"";
                                }
                            }
                          );