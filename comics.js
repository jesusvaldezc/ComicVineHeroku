const credentials = require('./credentials.js')
const request = require('request')

const character = function (superhero, callback) {
    const url = 'https://comicvine.gamespot.com/api/search/?api_key=' + credentials.COMICVINE_API_KEY + '&format=json&sort=name:asc&resources=character&query=' + superhero
    console.log(url)
    request({ url, json: true }, function (error, response) {

        if (error) {
            console.log('HAY ERROR en la conexion a ComicVine')
            callback(error, undefined)
        }
        else {
            const data = response.body;
            if(data.error == "Invalid API Key")
            {
                callback("La API key no es valida " + data.error, undefined)
            }
            if(data.number_of_total_results == 0)
            {
                callback("No existe el personje que esta buscando ", undefined)
            }
            else
            {
                const info = {
                    HeroName: superhero,
                    aliases: data.results[0].aliases,
                    description: data.results[0].deck,
                    firstComic: data.results[0].first_appeared_in_issue.name
                }
                callback(undefined, info)
            }
        }
    }    
)}

module.exports = {
    character
}