export const stageSize = (items) => {
  let widthSize = items.length
  let heightSize = 1
  items.forEach(x => {
    heightSize = x.items.length > heightSize ? x.items.length : heightSize
  });

  return {
    width: widthSize * 320,
    height: heightSize * 210 + 200
  }
}