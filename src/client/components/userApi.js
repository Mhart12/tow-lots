// const api = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/api';

// const baseOptions = {
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
//   mode: 'cors',
//   credentials: 'include',
// }
//
// export function addUser(username, email, password) {
//   return fetch(`/users`, {
//     ...baseOptions,
//     method: 'POST',
//     body: JSON.stringify({ username, email, password }),
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then(data => data ? data.user : null)
//     .catch(error => {
//       console.log(error);
//     });
// }
