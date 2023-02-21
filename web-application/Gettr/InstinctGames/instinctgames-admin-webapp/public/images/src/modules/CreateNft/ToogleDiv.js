import React from "react";

 function ToogleDiv () {


  // state = {
  //   stats: [{ index: Math.random(), type: "", value: "", color: "" }],
  // };

  // // handleChange = (e) => {
  // //     if (["type", "value", "color"].includes(e.target.name)) {
  // //         let stats = [...this.state.stats]
  // //         stats[e.target.dataset.id][e.target.name] = e.target.value;
  // //     } else {
  // //         this.setState({ [e.target.name]: e.target.value })
  // //     }
  // // }

  // addNewRow = () => s{
  //   this.setState((prevState) => ({
  //     stats: [
  //       ...prevState.stats,
  //       { index: Math.random(), type: "", value: "", color: "" },
  //     ],
  //   }));
  // };

  // deteteRow = (index) => {
  //   this.setState({
  //     stats: this.state.stats.filter((s, sindex) => index !== sindex),
  //   });
  //   // const stats1 = [...this.state.stats];
  //   // stats1.splice(index, 1);
  //   // this.setState({ stats: stats1 });
  // };

  // // handleSubmit = (e) => {
  // //     e.preventDefault();
  // //     if(this.state.date==='' || this.state.description==='')
  // //     {
  // //         NotificationManager.warning("Please Fill up Required Field . Please check value and Date Field");
  // //         return false;
  // //     }
  // //     for(var i=0;i<this.state.stats.length;i++)
  // //     {
  // //             if(this.state.stats[i].type==='' || this.state.stats[i].value==='')
  // //             {
  // //                 NotificationManager.warning("Please Fill up Required Field.Please Check Project name And value Field");
  // //                 return false;
  // //             }
  // //     }
  // //     let data = { formData: this.state, userData: localStorage.getItem('user') }
  // //     axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
  // //     axios.post("http://localhost:9000/api/value", data).then(res => {
  // //         if(res.data.success) NotificationManager.success(res.data.msg);
  // //     }).catch(error => {
  // //         if(error.response.status && error.response.status===400)
  // //         NotificationManager.error("Bad Request");
  // //         else NotificationManager.error("Something Went Wrong");
  // //         this.setState({ errors: error })
  // //     });
  // // }

  // clickOnDelete(record) {
  //   this.setState({
  //     stats: this.state.stats.filter((r) => r !== record),
  //   });
  // }

 
  const [statData , setStatData] = React.useState([
    {
      type : "",
       value : "" ,
       color : "",
      },
  
      {
        type : "boy",
         value : "hey", 
         color : "green",
        }
      ])

  const addItem = () => {
    console.log("clicked");
    let tempData = statData;
    tempData.push({
      type: "",
      value : "",
      color : "",})
  console.log(tempData);
  setStatData(tempData)
}
  
  const removeItem = (index) => {
  
    let tempData = statData;
    tempData.splice(index, 1);
    setStatData(tempData)
  }
  
     
      // <div>
      //   <div className="toogleMainDiv">
      //     <div>
      //       <div className="toogleDiv">
      //         <input className="toogleInput" placeholder="Type"></input>
      //       </div>
      //     </div>
      //     <div>
      //       <div className="toogleDiv" style={{ margin: "0 19px 0 19px" }}>
      //         <input placeholder="Value" className="toogleInput"></input>
      //       </div>
      //     </div>
      //     <div>
      //       <div className="colourDiv"></div>
      //     </div>
      //     <button onClick={this.addNewRow}> + </button>
      //   </div>
      // </div>
     
      return (
        <>
      {
        statData.map((data, index) => (
      <div>

        <input value={data.type}></input>
        <input value={data.value }></input>
        <input value={data.color }></input>
        
        {index===statData.length-1 
        ?
         <button onClick={ addItem}>+</button>
       :
         <button onClick={()=> removeItem(index)}>-</button>}
         </div>) 
         
        )}
        </>
     )}

export default ToogleDiv;
