import Router from "next/router";

export const shortContent = (content: string, countOfOutWords: number) => {
    let shortContent: string = '';
    const wordsArray = content.split(' ');
    const minLen = wordsArray.length < countOfOutWords? wordsArray.length : countOfOutWords; 
  
    for (let index = 0; index < minLen; index++) {
      const element = wordsArray[index];
      shortContent += element+' ';
    }
  
    return shortContent
}

export const goBack = () => {
  Router.back();
}

export const DataToArray = (data: any) => {
  if(data.length > 0){
    return data
  }else{
    return [data];
  }
}