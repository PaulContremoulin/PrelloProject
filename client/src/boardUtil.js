
/**
 * @desc checks if the given positions are valid
 * @param { Object } lesserObject
 * @param { Object } upperObject
 * @return boolean
 */
export function isPosValid(lesserObject, upperObject) {
  const lesserPos = (lesserObject) ? lesserObject.pos : false;
  const upperPos = (upperObject) ? upperObject.pos : false;
  if ((lesserPos || lesserPos == 0) && (upperPos || upperPos == 0 )) {
    return ((upperPos - lesserPos) > 1 );
  } else {
    return false;
  }
}
/**
 * @desc Give the position to place an objet between the objects given, or false if the positions aren't valid.
 * @param { Object } lesserObject
 * @param { Object } upperObject
 * @return Integer / boolean
 */
export function calcPos(lesserObject, upperObject) {
  if (isPosValid(lesserObject, upperObject)) {
    return ((lesserObject.pos + upperObject.pos)/2)
  } else {
    return false;
  }
}
/**
 * @desc Reset all positions in an array
 * @param { Array[Object] } arrayObjects
 * @return Integer
 */
export function setupAllPos (arrayObjects) {
  const newArrayObjects = arrayObjects.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0));
  return newArrayObjects.map(
    (posObj, index) => ({ ...posObj, pos: 65536*(index+1) })
  );
}
/**
 * @desc Calculates the next position from an object
 * @param { Object } lastObject
 * @return Integer
 */
export function calcNextPos(lastObject) {
  return (lastObject.pos + 65536);
}
/**
 * @desc Calculates the next position for a given array
 * @param { Array[Object] } arrayObjects
 * @return Integer
 */
export function nextPosFromArray(arrayObjects) {
  if (arrayObjects && arrayObjects.length !== 0) {
    const sortedArray = arrayObjects.sort( function(a, b) {
      if (a.pos < b.pos) {
        return -1;
      }
      if (a.pos > b.pos) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    return ((sortedArray[sortedArray.length - 1]).pos + 65536);
  } else {
    return 65536;
  }
}
/**
 * @desc Sort objects from their positions
 * @param { Objects } a, b
 * @return Integer
 */
export function sortObjects(a, b) {
   if (a.pos < b.pos) {
     return -1;
   }
   if (a.pos > b.pos) {
     return 1;
   }
   // a must be equal to b
   return 0;
}
