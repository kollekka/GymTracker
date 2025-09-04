import React, { useEffect, useState, useRef, useCallback } from 'react';
import AppLayout from './components/layout/AppLayout';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const DAY_NAMES = ['Pon','Wto','Śro','Czw','Pią','Sob','Nie'];
const INITIAL_DAYS = [
	{ focus: 'Klatka + Triceps', done: false },
	{ focus: 'Plecy + Biceps', done: false },
	{ focus: 'Nogi', done: false },
	{ focus: 'Barki + Core', done: false },
	{ focus: 'Full Body / Technika', done: false },
	{ focus: 'Cardio / Mobilność', done: false },
	{ focus: 'Regeneracja', done: false }
];

const samplePlans = [
	{ title: 'Push / Pull / Legs', desc: 'Klasyczny split 6 dni', tag: 'Popularne' },
	{ title: 'Upper / Lower', desc: '4 dni w tygodniu, balans', tag: 'Balans' },
	{ title: 'FBW 3x', desc: 'Dla początkujących', tag: 'Start' },
	{ title: 'Hypertrophy 5x', desc: 'Nacisk na objętość', tag: 'Masa' },
];

function Home() {
	const { user, ready } = useAuth();
	const navigate = useNavigate();
	const [days, setDays] = useState(INITIAL_DAYS);
	const dragIndexRef = useRef(null);
	const [draggingIndex, setDraggingIndex] = useState(null);
	const [hoverIndex, setHoverIndex] = useState(null);

	const handleDragStart = useCallback((e, index) => {
		dragIndexRef.current = index;
		setDraggingIndex(index);
		e.dataTransfer.effectAllowed = 'move';
	}, []);

	const handleDragOver = useCallback((e, index) => {
		e.preventDefault();
		setHoverIndex(index);
	}, []);

		const handleDragLeave = useCallback((e, index) => {
			setHoverIndex(prev => (prev === index ? null : prev));
		}, []);

	const handleDrop = useCallback((e, targetIdx) => {
		e.preventDefault();
		const from = dragIndexRef.current;
		if (from === null || from === targetIdx) return;
		setDays(prev => {
			const clone = [...prev];
			[clone[from], clone[targetIdx]] = [clone[targetIdx], clone[from]];
			return clone;
		});
		dragIndexRef.current = null;
		setDraggingIndex(null);
		setHoverIndex(null);
	}, []);

	const handleDragEnd = useCallback(() => {
		dragIndexRef.current = null;
		setDraggingIndex(null);
		setHoverIndex(null);
	}, []);

	const toggleDone = useCallback((idx) => {
		setDays(prev => prev.map((d,i) => i===idx ? { ...d, done: !d.done } : d));
	}, []);

	useEffect(() => {
		if (!ready) return; // czekamy aż kontekst się załaduje
		if (!user) navigate('/login');
	}, [ready, user, navigate]);

	if (!ready || !user) {
		return (
			<AppLayout>
				<div className="d-flex justify-content-center align-items-center p-5 text-muted small">Ładowanie...</div>
			</AppLayout>
		);
	}

	return (
		<AppLayout>
			<div className="container-fluid min-vh-100 d-flex flex-column p-0">
				<div className="row flex-grow-1 g-0">
					{/* Main content */}
					<main className="col-12 col-md-9 col-lg-10 p-4 bg-light">
					{/* User section */}
						<div className="row g-3 mb-4" id="dashboard">
							<div className="col-12 col-lg-4">
								<div className="card shadow-sm h-100">
									<div className="card-body">
										<h5 className="card-title mb-1">Witaj, {user.name}</h5>
										<span className="badge bg-primary mb-3">Poziom: {user.level || 'N/D'}</span>
										<h6 className="fw-semibold">Cele:</h6>
										<ul className="list-unstyled small mb-3">
											{(user.goals && user.goals.length > 0 ? user.goals : ['Dodaj cel']).map(g => <li key={g}>• {g}</li>)}
										</ul>
										<button className="btn btn-sm btn-outline-primary">Edytuj profil</button>
									</div>
								</div>
							</div>
							<div className="col-12 col-lg-8">
								<div className="card shadow-sm h-100">
									<div className="card-body d-flex flex-column">
										<div className="d-flex justify-content-between align-items-center mb-2">
											<h5 className="card-title mb-0">Tydzień treningowy</h5>
											<button className="btn btn-sm btn-outline-secondary">Zmień układ</button>
										</div>
										<div className="row g-2 flex-grow-1">
											{days.map((d, index) => {
												const isDragging = draggingIndex === index;
												const isHover = hoverIndex === index && draggingIndex !== index;
												const scale = isDragging || isHover ? 1.08 : 1;
												const shadow = (isDragging || isHover) ? '0 4px 14px -4px rgba(0,0,0,.25),0 0 0 3px rgba(13,110,253,.35)' : 'none';
												return (
													<div className="col-6 col-md-4" key={index}>
														<div
															className={`border rounded p-2 h-100 small position-relative draggable-day ${d.done ? 'bg-success-subtle' : 'bg-white'}`}
															draggable
															onDragStart={(e)=>handleDragStart(e,index)}
															onDragOver={(e)=>handleDragOver(e,index)}
															onDragLeave={(e)=>handleDragLeave(e,index)}
															onDrop={(e)=>handleDrop(e,index)}
															onDragEnd={handleDragEnd}
															style={{
																cursor: 'grab',
																opacity: isDragging ? 0.85 : 1,
																transform: `scale(${scale})`,
																transition: 'transform 120ms ease, box-shadow 120ms ease, opacity 120ms',
																boxShadow: shadow,
																zIndex: isDragging || isHover ? 10 : 'auto'
															}}
															onClick={()=>toggleDone(index)}
														>
															<div className="d-flex justify-content-between align-items-start">
																<strong>{DAY_NAMES[index]}</strong>
																{d.done && <span className="badge bg-success">✔</span>}
															</div>
															<div className="text-muted mt-1" style={{fontSize: '0.75rem'}}>{d.focus}</div>
															<div className="d-flex gap-2 mt-2">
																<button className="btn btn-link btn-sm p-0">Szczegóły</button>
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Ready-made plans */}
						<div className="row g-3 mb-4" id="plans">
							<div className="col-12 d-flex justify-content-between align-items-center">
								<h5 className="mb-0">Gotowe plany</h5>
								<button className="btn btn-sm btn-primary">+ Nowy plan</button>
							</div>
							{samplePlans.map(p => (
								<div className="col-12 col-sm-6 col-lg-3" key={p.title}>
									<div className="card h-100 shadow-sm">
										<div className="card-body d-flex flex-column">
											<div className="d-flex justify-content-between align-items-start mb-2">
												<h6 className="fw-semibold mb-0">{p.title}</h6>
												<span className="badge bg-secondary">{p.tag}</span>
											</div>
											<p className="small text-muted flex-grow-1">{p.desc}</p>
											<button className="btn btn-sm btn-outline-primary mt-auto">Zobacz</button>
										</div>
									</div>
								</div>
							))}
						</div>

							{/* Placeholder additional sections */}
							<div className="row g-3 mb-4" id="progress">
								<div className="col-12">
									<div className="card shadow-sm">
										<div className="card-body">
											<h5 className="card-title mb-2">Progres (coming soon)</h5>
											<p className="text-muted small mb-0">Tu pojawią się wykresy ciężarów, objętości, sylwetki.</p>
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</AppLayout>
	);
}

export default Home;
