import React from 'react';

const EventList = ({ events }) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <h3>Events</h3>
      {events.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        events.map((event, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
