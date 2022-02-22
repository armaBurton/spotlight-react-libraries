export function generateColumns(arr) {
  const keys = Object.keys(arr[0]);

  const columns = keys.map(key => {
    return {
      key: key,
      name: key.split('_')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    };
  });
  return columns;
}

export function makeCountByFavColor(arr){
  const countTotalColor = arr.reduce((acc, cur) => {
    if (acc[cur.fav_color]) {
      acc[cur.fav_color].total = acc[cur.fav_color].total + 1;
      
    } else {
      acc[cur.fav_color] = {};
      acc[cur.fav_color].total = 1;
    }

    return acc;
  }, {});

  return Object.entries(countTotalColor)
    .map((color, i) => ({
      color: color[0],
      key: i,
      totalCount: color[1].total,
    }));
}