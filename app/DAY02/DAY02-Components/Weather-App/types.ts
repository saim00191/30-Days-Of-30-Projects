
export interface WeatherDataTypes {
    name: string;
    country: string;
    temperature: number;
    conditionText: string;
    conditionIcon: string;
    humidity: number;
    windSpeed: number;
  }
  
  export interface EventTypes{
      target : {value:string}
  }