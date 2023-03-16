
// const baseUrl = 'http://localhost:8080/roles';
// const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckBhZG1pbi5jb20iLCJleHAiOjE2Nzg5OTUzMjksImlhdCI6MTY3ODk1OTMyOX0.V6e1EFFNCzS4sOTqOAN0nd5M_oCnPDkYPcKtId2XaiDAchB26-ZCpJTNO94Otu1uAKSB8QgmruN-PzEDa8WMcw';

// export const getAll = async () => {
//     let result = null;
//     result = fetch(baseUrl), {
//         method: 'GET',
//         headers: {
//             'content-type': 'aplication/json',
//             'Authorization': 'Bearer ' + jwt
//         }
//     }
//     console.log(result.then(responseHandler));
    
//     return result.then(responseHandler);
// } 

// async function responseHandler(res:any) {
//     let jsonData = await res.json();

//     if (res.ok) {
//         return Object.values(jsonData);
//     } else {
//         throw jsonData;
//     }
// };
