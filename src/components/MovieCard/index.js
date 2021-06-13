import React from "react";
import { Image, Label } from "semantic-ui-react";
import { Button, Header, Modal } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import api from "../../utils/api";

const MovieCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedMovie, setSetSelectedMovie] = React.useState([]);

  const getSelectedMovie = () => {
    setLoading(true);
        api.selectedMovie(props.id).then((res) => {
            console.log(res);
            setSetSelectedMovie(res);
            setLoading(false);
            setOpen(true);
          });
  };

  return (
    <>
      <div style={{}} className="poster-container">
        <div style={{ flex: 1 }}>
          <Label as="a" color="red" ribbon>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </Label><br/>
          <Label as='a' color='orange' ribbon='left'>
          {props.title}
        </Label>
          <img src={props.poster} alt="" className="poster-image" />
        </div>
        <div style={{ flex: 1 }}>
         

          <div
            style={{
              display: "flex",
              paddingLeft: "20px",
              flexDirection: "column",
            }}
          >
            <p style={{ color: "white" }}>
              The {props.type.charAt(0).toUpperCase() + props.type.slice(1)}{" "}
              Released on:{" "}
              <span style={{ fontWeight: "600" }}>{props.released}</span>'th
              year
            </p>
          </div>
          <div
            className="Showdetails-container"
          >
            <div style={{ marginBottom: "10px", marginRight: "15px" }}>
              <Button
                primary
                size="mini"
                onClick={getSelectedMovie}
                loading={loading}
              >
                Show for details >>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          //   trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>More Info</Modal.Header>
          <Modal.Content image>
            <Image size="medium" src={selectedMovie.Poster} wrapped />
            <Modal.Description>
              <Header>Selected Movie Details</Header>
              <p>Actors: {selectedMovie.Actors}</p>
              <p>Director: {selectedMovie.Director}</p>
              <p>Genre: {selectedMovie.Genre}</p>
              <p>Plot: {selectedMovie.Plot}</p>
              <p>Awards: {selectedMovie.Awards}</p>
              <p>Imdb Rating: {selectedMovie.imdbRating}</p>
              <p>Production: {selectedMovie.Production}</p>
              <p>Run Time: {selectedMovie.Runtime}</p>
              <p>Meta Score: {selectedMovie.Metascore}</p>
              <p>Box Office: {selectedMovie.BoxOffice}</p>
              <p>Released Date: {selectedMovie.Released}</p>
              <p>Ratings</p>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Source</Table.HeaderCell>
                    <Table.HeaderCell>Ratings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {selectedMovie.Ratings &&
                    selectedMovie.Ratings.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{item.Source}</Table.Cell>
                          <Table.Cell>{item.Value}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
};

export default MovieCard;
