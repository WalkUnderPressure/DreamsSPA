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