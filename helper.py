
# Contains various helper functions for the clustering model

# Returns how many of a song's attributes are outside of standard 
# range of a given cluster
def getResiduals(song, mean, stdDev):
    cluster = song['cluster']
    song = song[['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']]
    totalResidual = 0
    for index, attribute in song.items():
        totalResidual += abs((attribute - mean[mean['cluster'] == cluster][index]) / stdDev[stdDev['cluster'] == cluster][index])
    return totalResidual


def getTopSongs(cluster, sp, playLength):
    songs = sp[sp['cluster'] == cluster]
    return songs.sort_values('residuals', ascending=True).head(playLength)