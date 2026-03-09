import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../services/api';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getEvent(id)
            .then((res) => setEvent(res.data))
            .catch(() => setError('Impossible de charger cet événement.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <p>Événement introuvable.</p>;

    return (
        <div className="event-detail">
            <h1>{event.title}</h1>
            {event.image && <img src={`http://127.0.0.1:8000${event.image}`} alt={event.title} />}
            <p>{event.description}</p>
            <p>Lieu: {event.location}</p>
            <p>Date: {new Date(event.date).toLocaleString('fr-FR')}</p>
            <p>Participants: {event.registrations_count}</p>
        </div>
    );
}

export default EventDetail;
