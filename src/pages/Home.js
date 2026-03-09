import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents()
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="home-container">
            <h1>Événements à venir</h1>
            {events.length === 0 ? (
                <p>Aucun événement disponible pour le moment.</p>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            {event.image && (
                                <img src={`http://127.0.0.1:8000${event.image}`} alt={event.title} />
                            )}
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>Lieu: {event.location}</p>
                                <p>Date: {new Date(event.date).toLocaleDateString('fr-FR')}</p>
                                <p>Participants: {event.registrations_count} inscrit(s)</p>
                                <Link to={`/events/${event.id}`}>Voir détails</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
