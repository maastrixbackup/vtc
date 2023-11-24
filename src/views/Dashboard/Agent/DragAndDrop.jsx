import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

function DragAndDrop({ dragImages,setDragImages,setIdsArray }) {
  const SortablePhoto = SortableElement(({ res, index }) => (
    <div className="col-lg-4 col-md-4 mb-5 imageSortable" key={index}>
      <img src={res.imageurl} height={"100%"} width={"100%"} />
    </div>
  ));

  const SortableGallery = SortableContainer(({ items }) => (
    <div className="row">
      {items.map((value, index) => (
        <SortablePhoto key={`item-${index}`} index={index} res={value} />
      ))}
    </div>
  ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const nextState = arrayMove(dragImages, oldIndex, newIndex);
    setDragImages(nextState);
    var arr = [];
    nextState.forEach((res) => {
      arr.push(res.id);
    });
    setIdsArray(arr)
  };

  return (
    <>
      <SortableGallery axis={"xy"} items={dragImages} onSortEnd={onSortEnd} />
    </>
  );
}

export default DragAndDrop;
