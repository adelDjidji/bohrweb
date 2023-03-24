import moment from "moment"


export function Xformater (xScale:string, val:string){

    if (val.indexOf("/")==2){
      var format_date = "DD/MM/YYYY HH:mm:ss"
    } else {
      var format_date = "YYYY/MM/DD HH:mm:ss"
    }
  

    switch (xScale) {
      case "hour":
        // return moment(val).hour()<2 ? moment(val).format("DD/MM"): moment(val).hour()+'h';
        return moment(val,format_date).format("DD/MM H")+'h'
      case "day":
        return moment(val,format_date).format("DD MMM");
      case "week":
        return `Week of ${moment(val,format_date).startOf('week').format('D MMM')}`;
      case "month":
        return moment(val,format_date).format("MMM YYYY");
      default:
        return val;
    }
  }

  export function tickFormatter (value, xScale) {
    return Xformater(xScale, value)
  };
  
  export function Xtransformer(data, xScale, dateAttr='date'){
  
    
    const keys = data.length ? Object.keys(data[0]).filter(k=>k!=dateAttr) : []
    const groupedData = {};
  
    for (const item of data) {
      if (!groupedData[tickFormatter(item[dateAttr], xScale)]) {
        groupedData[tickFormatter(item[dateAttr], xScale)] = [];
      }
      groupedData[tickFormatter(item[dateAttr], xScale)].push(item);
    }
    

    const transformedData = [];
    
    for (const date in groupedData) {
      const group = groupedData[date];
      
      const aggregatedValues = keys.reduce((aggregatedData, key) => {
        aggregatedData[key] = group.reduce((sum, item) => !!item[key] ? sum + item[key] : sum, 0) / group.length;
        return aggregatedData;
      }, {});
      
      transformedData.push({
        [dateAttr]:date,
        ...aggregatedValues
      });
    }
    
   
    return transformedData
  }


  export function XtransformerSum(data, xScale, dateAttr='date'){
  
    
    const keys = data.length ? Object.keys(data[0]).filter(k=>k!=dateAttr) : []


    const groupedData = {};
  
    for (const item of data) {
      if (!groupedData[tickFormatter(item[dateAttr], xScale)]) {
        groupedData[tickFormatter(item[dateAttr], xScale)] = [];
      }
      groupedData[tickFormatter(item[dateAttr], xScale)].push(item);
    }
    


    const transformedData = [];
    
    for (const date in groupedData) {
      const group = groupedData[date];
      
      const aggregatedValues = keys.reduce((aggregatedData, key) => {
        aggregatedData[key] = group.reduce((sum, item) => !!item[key] ? sum + item[key] : sum, 0);
        return aggregatedData;
      }, {});
      
      transformedData.push({
        [dateAttr]:date,
        ...aggregatedValues
      });
    }
    
   
    return transformedData
  }