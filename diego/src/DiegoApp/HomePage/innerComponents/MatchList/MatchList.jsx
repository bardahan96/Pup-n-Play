
import { useOutletContext } from "react-router";
import "./MatchList.css";

export default function MatchList() {

    const { matchList } = useOutletContext();

    return (
        <>
        
             <div className="match-list-container">
                <h2>Your Matches</h2>
                <div className="matches-list-container-cards-wrapper">
                {matchList && matchList.length > 0 ? (
                    <div className="matches-list">
                        {matchList.map((match, index) => (
                            <div key={index} className="match-item">
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
            </div> 
        </>
    )
    
};
