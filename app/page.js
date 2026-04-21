"use client";
import React, { useEffect, useState } from 'react';

const CricketForm = () => {

    const [playerName, setPlayerName] = useState("");
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerRole, setPlayerRole] = useState("");
    const [tshirtsize, settshirtsize] = useState("");
    const [playerSkills, setPlayerSkills] = useState([]); 
    
    const [squad, setSquad] = useState([]);
    const [editingId, setEditingId] = useState(null);

    
    useEffect(() => {
        const puranaData = localStorage.getItem("mySquad");
        if (puranaData) {
            setSquad(JSON.parse(puranaData));
        }
    }, []);

    // 2. Checkbox Handle 
    const handleSkillChange = (e) => {
        const val = e.target.value;
        if (e.target.checked === true) {
            setPlayerSkills([...playerSkills, val]);
        } else {
            const nayaSkills = playerSkills.filter((item) => item !== val);
            setPlayerSkills(nayaSkills);
        }
    };

    // 3 Add aur Update dono isi mein
    const submitForm = (e) => {
        e.preventDefault();

        const nayaPlayer = {
            id: editingId || Date.now(),
            name: playerName,
            email: playerEmail,
            role: playerRole,
            tshirtsize: tshirtsize,
            skills: playerSkills
        };

        let finalSquad;
        if (editingId) {
            // Agar edit kar rahe hain
            finalSquad = squad.map(p => p.id === editingId ? nayaPlayer : p);
            setEditingId(null);
        } else {
            // Naya player add kar rahe hain
            finalSquad = [...squad, nayaPlayer];
        }

        setSquad(finalSquad);
        localStorage.setItem("mySquad", JSON.stringify(finalSquad));

        // Form khali karo
        setPlayerName(""); setPlayerEmail(""); setPlayerRole("");
        settshirtsize(""); setPlayerSkills([]);
    };

    // 4. Delete Function
    const deleteMe = (id) => {
        const bacheHuePlayers = squad.filter(p => p.id !== id);
        setSquad(bacheHuePlayers);
        localStorage.setItem("mySquad", JSON.stringify(bacheHuePlayers));
    };

    // 5. Edit Function
    const editMe = (p) => {
        setEditingId(p.id);
        setPlayerName(p.name);
        setPlayerEmail(p.email);
        setPlayerRole(p.role);
        settshirtsize(p.tshirtsize);
        setPlayerSkills(p.skills);
    };

    return (
        <div style={{ backgroundColor: '#1192b3', minHeight: '100vh', padding: '40px 10px', color: '#fff' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h1 style={{ fontWeight: '900', letterSpacing: '2px', color: '#f1c40f' }}>🏏 PREMIER SQUAD SELECTION</h1>
                    <p className="text-light">Register your player for the upcoming tournament</p>
                </div>

                <div className="row g-4">
                    
                    <div className="col-lg-4">
                        <div className="card shadow" style={{ borderRadius: '15px', border: 'none', background: '#fff', color: '#333' }}>
                            <div className="card-body p-4">
                                <h4 className="mb-4 fw-bold border-bottom pb-2">{editingId ? "Update Info" : "New Registration"}</h4>
                                <form onSubmit={submitForm}>
                                    <div className="mb-3">
                                        <label className="fw-bold small">PLAYER NAME</label>
                                        <input type="text" className="form-control" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required style={{ border: '2px solid #eee' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-bold small">EMAIL</label>
                                        <input type="email" className="form-control" value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-bold small">ROLE</label>
                                        <select className="form-select" value={playerRole} onChange={(e) => setPlayerRole(e.target.value)} required>
                                            <option value="">Select Role</option>
                                            <option value="Left Batsman">Left Hand Batsman</option>
                                             <option value="Right Batsman">Right Hand Batsman</option>
                                            <option value="Right Bowler">Right Hand Bowler</option>
                                            <option value="Left Bowler">Left Hand Bowler</option>
                                            <option value="All-Rounder">All-Rounder</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="fw-bold d-block small">T-shirt Size</label>
                                        <input type="radio" name="g" value="M" checked={tshirtsize === "M"} onChange={(e) => settshirtsize(e.target.value)} /> <span className="me-3">M</span>
                                        <input type="radio" name="g" value="L" checked={tshirtsize === "L"} onChange={(e) => settshirtsize(e.target.value)} /> <span className="me-3">L</span>
                                        <input type="radio" name="g" value="XL" checked={tshirtsize === "XL"} onChange={(e) => settshirtsize(e.target.value)} /> <span className="me-3">XL</span>
                                        <input type="radio" name="g" value="XXL" checked={tshirtsize === "XXL"} onChange={(e) => settshirtsize(e.target.value)} /> <span className="me-3">XXL</span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="fw-bold d-block small">ADDITIONAL SKILLS</label>
                                        <div className="p-2" style={{ background: '#f9f9f9', borderRadius: '8px' }}>
                                            <input type="checkbox" value="Wicket Keeping" checked={playerSkills.includes("Wicket Keeping")} onChange={handleSkillChange}/>Wicket Keeping
                                            <input type="checkbox" value="Captain" checked={playerSkills.includes("Captain")} onChange={handleSkillChange} className="ms-3" /> Captaincy
                                            <input type="checkbox" value="Fielder" checked={playerSkills.includes("Fielder")} onChange={handleSkillChange} className="ms-3" />Fielder
                                        </div>
                                    </div>
                                    <button className="btn w-100 fw-bold py-2" style={{ background: '#f1c40f', color: '#000' }}>
                                        {editingId ? "SAVE CHANGES" : "ADD TO SQUAD"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                
                    <div className="col-lg-8">
                        <div className="p-4 shadow-lg" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                            <h4 className="mb-4 text-warning fw-bold">🏟️ REGISTERED PLAYERS</h4>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover" style={{ verticalAlign: 'middle' }}>
                                    <thead>
                                        <tr style={{ color: '#f1c40f' }}>
                                            <th>Player Info</th>
                                            <th>Role</th>
                                            <th>Additionl Skills</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {squad.map((p) => (
                                            <tr key={p.id}>
                                                <td>
                                                    <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{p.name}</div>
                                                    <div className="text-secondary small">{p.email} ({p.tshirtsize})</div>
                                                </td>
                                                <td><span className="badge p-2 px-3" style={{ background: '#27ae60' }}>{p.role}</span></td>
                                                <td className="small text-info">{p.skills.join(" • ")}</td>
                                                <td className="text-end">
                                                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => editMe(p)}>Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteMe(p.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {squad.length === 0 && <div className="text-center p-5 opacity-50">Squad is empty. Start recruiting!</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CricketForm;