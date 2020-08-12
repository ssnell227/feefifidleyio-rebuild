const axios = require('axios')
const { authenticate } = require('../utils/spotifyAuth')
const playlistData = require('../utils/playlistData')

module.exports = {
    getPlaylistItems: async (req, res) => {
        const { spotifyId } = req.body
        
        const accessToken = await authenticate()
            .catch(err => console.log(err))
        
        const items = await axios.get(`https://api.spotify.com/v1/playlists/${spotifyId}/tracks?fields=items(track(album(name,images),artists,name,preview_url))`, { headers: { Authorization: 'Bearer ' + accessToken } })
            .catch(err => console.log(err))

        if (items) {
            const tracks = items.data.items

            res.status(200).send(tracks)
        }
    },
    getPlaylists: (req, res) => {
        res.status(200).send(playlistData)
    }
}