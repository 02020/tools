/**
 * 
 * @param {*} fields 
 * @param {*} items 
 * @return 返回合并字典的配置
 */
export const getMerge = (fields, items) => {
  let list = []
  if (!fields || !Array.isArray(items))
    return []

  if (typeof fields === 'string') {
    fields = fields.split(',')
  }

  fields.forEach(field => {
    var k = 0;
    while (k < items.length) {
      list[k] = list[k] || {}
      list[k][field] = 1

      for (var i = k + 1; i <= items.length - 1; i++) {
        var flag = items[k][field] == items[i][field] && items[k][field] != '';

        if (flag) {
          list[k][field]++;
          list[i] = list[i] || {}
          list[i][field] = 0

        } else {
          break;
        }
      }
      k = i;
    }
  })
  return list
}


/*
  this.mergeData = getMerge("yhfs", data)
     return [this.mergeData[rowIndex][column.key], 1]
    },


*/