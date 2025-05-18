import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({ complist, update_list }) {
  const classes = useStyles();

  // Update Lists of Mid Area
  const onDragEnd = (result) => {
    // If there's no destination or source, return early
    if (!result.destination || !result.source) {
      return;
    }

    // If dropped in the same place, do nothing
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const element = result.draggableId.split("-")[0];
    const old_list = complist.midAreaLists;

    // Handle source list
    const source_index = old_list.findIndex(
      (x) => x.id === result.source.droppableId
    );

    if (source_index > -1) {
      const comp_list = [...old_list[source_index].comps];
      comp_list.splice(result.source.index, 1);
      old_list[source_index].comps = comp_list;
    }

    // Handle destination list
    const dest_index = old_list.findIndex(
      (x) => x.id === result.destination.droppableId
    );

    if (dest_index > -1) {
      const dest_comp_list = [...old_list[dest_index].comps];
      dest_comp_list.splice(result.destination.index, 0, element);
      old_list[dest_index].comps = dest_comp_list;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      <div className={classes.root}>
        <AppBar position="static" className="bg-opacity-90 backdrop-blur-lg bg-gray-800 border-b border-gray-700">
          <Toolbar className="justify-center">
            <Typography variant="h4" className="text-white font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              MIT Scratch Clone
            </Typography>
            <div className="absolute right-4">
              <Button 
                color="inherit"
                className="hover:bg-purple-700 transition-colors duration-200 rounded-full"
              >
                <GitHubIcon
                  onClick={() =>
                    (window.location.href =
                      "https://github.com/aryan2034")
                  }
                />
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className="h-screen overflow-hidden flex flex-row pt-6 px-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-gray-800 bg-opacity-90 backdrop-blur-lg border border-gray-700 rounded-tr-xl mr-2 shadow-2xl">
            <Sidebar />
            <MidArea />
          </div>
          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-gray-800 bg-opacity-90 backdrop-blur-lg border border-gray-700 rounded-tl-xl ml-2 shadow-2xl">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

// mapping state to props
const mapStateToProps = (state) => {
  return {
    complist: state.list,
  };
};

export default connect(mapStateToProps)(App);
