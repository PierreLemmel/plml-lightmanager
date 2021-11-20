import { useDocument } from 'react-firebase-hooks/firestore';
import { getDocument, useAuth } from '../Services/Firebase/Firebase';

const ShowControl = () => {

    const [user] = useAuth();

    const [value, loading, error] = useDocument(getDocument("public/dmx512"));
    return <div>
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Document: Loading...</span>}
            {value && <span>Document: {JSON.stringify(value.data())}</span>}
        </div>
        <div>
            {user && user.uid}
        </div>
    </div>
};

export default ShowControl;