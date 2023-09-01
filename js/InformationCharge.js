const informationCharge = (api) => {
    return new Promise(async (resolve, reject) => {
      let listaPokemon = [];
      const promesas = [];
  
      for (let index = 1; index <= 150; index++) {
        const apiUrl = api + index;
  
        const promesa = fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('No se pudo obtener los datos desde la API');
            }
            return response.json();
          })
          .then((data) => {
            listaPokemon.push(data);
          })
          .catch((error) => {
            console.error(error);
          });
  
        promesas.push(promesa);
      }
  
      try {
        await Promise.all(promesas);
        resolve(listaPokemon);
      } catch (error) {
        reject(error);
      }
    });
  };  

export default informationCharge;