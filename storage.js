/**
 * @flow
 */

 const getData = () => {
   return new Promise(resolve => {
     setTimeout(() => {
       resolve([...Array(50)].map(() => Math.random().toString(36).slice(2)));
     }, 500);
   });
}

export default getData;
