
export function isPosValid(lesserObject, upperObject) {
  const lesserPos = (lesserObject) ? lesserObject.pos : false;
  const upperPos = (upperObject) ? upperObject.pos : false;
  if (lesserPos && upperPos) {
    return ((upperPos - lesserPos) > 1 );
  } else {
    return false;
  }
}

export function calcPos(lesserObject, upperObject, movingObject) {
  if (isPosValid(lesserObject, upperObject)) {
    return ((lesserObject.pos + upperObject.pos)/2)
  } else {
    return false;
  }
}

export function setupAllPos (arrayObjects) {
  const newArrayObjects = arrayObjects.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0));
  return newArrayObjects.map(
    (posObj, index) => ({ ...posObj, pos: 65536*(index+1) })
  );
}

export function nextPos(lastObject) {
  return (lastObject.pos + 65536);
}

export function nextPosFromArray(arrayObjects) {
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
}
