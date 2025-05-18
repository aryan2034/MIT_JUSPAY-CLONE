import React from "react";
import { connect } from "react-redux";
import { addList } from "../redux/midarea/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";

const CodeBlock = ({ children, provided }) => (
  <li
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="mb-2 transform transition-all duration-300 hover:scale-105"
  >
    {children}
  </li>
);

const RunButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    </svg>
    Run
  </button>
);

const CodeArea = ({ list, onRun }) => (
  <div className="w-60 animate-fadeIn">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="w-52 border border-gray-200 rounded-md p-2 bg-gray-50">
        <Droppable droppableId={list.id} type="COMPONENTS">
          {(provided) => (
            <ul
              className={`${list.id} w-48 h-full`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="text-center mx-auto my-2 mb-4">
                <RunButton onClick={() => onRun(list.comps, list.id)} />
              </div>

              {list.comps?.map((component, index) => {
                const componentId = `comp${component}-${list.id}-${index}`;
                return (
                  <Draggable
                    key={`${component}-${list.id}-${index}`}
                    draggableId={`${component}-${list.id}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <CodeBlock provided={provided}>
                        {getComponent(component, componentId)}
                      </CodeBlock>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  </div>
);

function MidArea({ area_list, add_list, event_values }) {
  const executeCode = (components, listId) => {
    if (components.length === 0) return;
    
    let currentIndex = 0;
    let repeatCount = 1;

    const executeComponent = (index) => {
      const componentId = `comp${components[index]}-${listId}-${index}`;
      
      if (components[index] === "WAIT") {
        const waitTime = event_values.wait[componentId];
        return new Promise(resolve => setTimeout(resolve, waitTime * 1000));
      }
      
      if (components[index] === "REPEAT") {
        repeatCount *= (event_values.repeat[componentId] + 1);
        return Promise.resolve();
      }
      
      const element = document.getElementById(componentId);
      if (element) {
        element.click();
      }
      return Promise.resolve();
    };

    const runSequence = async () => {
      while (currentIndex < components.length) {
        await executeComponent(currentIndex);
        currentIndex++;
        
        if (components[currentIndex - 1] === "REPEAT" && repeatCount > 2) {
          repeatCount--;
          currentIndex--;
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };

    runSequence();
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3 bg-gradient-to-br from-[#1e0033] to-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white bg-green-500 px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105">
          Code Blocks
        </h2>

        <button
          onClick={add_list}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Block
        </button>
      </div>

      <div className="grid grid-flow-col gap-4">
        {area_list.midAreaLists.map((list) => (
          <CodeArea
            key={list.id}
            list={list}
            onRun={executeCode}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  area_list: state.list,
  event_values: state.event,
});

const mapDispatchToProps = {
  add_list: addList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
