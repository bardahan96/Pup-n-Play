
import { useOutletContext } from "react-router";
import { useRef, useState } from "react";
import "./MatchList.css";

export default function MatchList() {

    const { matchList } = useOutletContext();
    const [showNotice, setShowNotice] = useState(false);
    const hideTimerRef = useRef(null);

    function handleMatchClick() {
        setShowNotice(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowNotice(false), 2000);
    }

    return (
        <>
        
             <div className="match-list-container">
                <h2>Your Matches</h2>
                <div className="matches-list-container-cards-wrapper">
                {matchList && matchList.length > 0 ? (
                    <div className="matches-list">
                        {matchList.map((match, index) => (
                            <div  key={index} className="match-item" onClick={handleMatchClick}>
                                <img 
                                    src={match.imgs?.[0] || ''} 
                                    alt={match.name || 'Match'} 
                                    className="match-avatar"
                                />
                                <span className="match-name">{match.name || 'Unknown'}</span>
                                <div className="match-arrow">→</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-matches">No matches yet. Keep swiping!</p>
                )}
                </div>
                {showNotice && (
                    <div className="maintenance-modal" role="status" aria-live="polite">
                        <div className="maintenance-modal__panel">
                            <div className="maintenance-modal__title">On maintenance</div>
                            <div className="maintenance-modal__sub">This feature will be available soon</div>
                        </div>
                    </div>
                )}
            </div> 
        </>
    )
    
};
