from sklearn.cluster import KMeans
import pandas as pd
from sklearn.preprocessing import StandardScaler
from helper import getResiduals
from helper import getTopSongs

playlistLength = 25
clusterNum = 2

sp = pd.read_csv('out.csv')
print(sp.shape)
sp = sp.drop_duplicates()
print(sp.shape)

attributes = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']
X = sp[attributes]

scaler = StandardScaler()
scaler.fit(X)

k_means = KMeans(init="k-means++", n_clusters=clusterNum, n_init=12)
k_means.fit(X)
labels = k_means.labels_
sp['cluster'] = labels

colnames = ['cluster', 'acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness','speechiness', 'tempo', 'valence']
mean_clust = pd.DataFrame(columns=colnames)
stdv_clust = mean_clust

for cluster in range(0, clusterNum):
    temp = []
    temp2 = []
    temp.append(cluster)
    temp2.append(cluster)
    for attribute in attributes:
        temp.append(sp[sp['cluster'] == cluster][attribute].mean())
        temp2.append(sp[sp['cluster'] == cluster][attribute].std())
    result = dict(zip(colnames, temp))
    result2 = dict(zip(colnames, temp2))
    mean_clust = mean_clust.append(result, ignore_index=True)
    stdv_clust = stdv_clust.append(result2, ignore_index=True)

print(sp.groupby('cluster').count())
residuals = []
for index, row in sp.iterrows():
    residuals.append(float(getResiduals(row,mean_clust,stdv_clust)))

sp['residuals'] = residuals
playlists = []

print(mean_clust)
for cluster in range(0,clusterNum):
    playlists.append(getTopSongs(cluster, sp, playlistLength))

for cluster in range(0,clusterNum):
    print(playlists[cluster][['song_title', 'artist']])
    playlists[cluster].to_csv('playlist' + str(cluster) + '.csv')




