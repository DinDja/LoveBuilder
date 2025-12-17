import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Star, MessageCircle, ArrowLeft, MapPin, Info, Anchor, Camera, User, Briefcase, FileText } from 'lucide-react';
import { signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const appId = 'love-builder-project';

const MOCK_PROFILES = [
    {
        id: 1,
        name: 'Nami',
        age: 20,
        distance: '3 km',
        bio: 'Navegadora em busca de tesouros e laranjas. Se você não gosta de mapas, nem tente.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        job: 'Navegadora'
    },
    {
        id: 2,
        name: 'Sanji',
        age: 21,
        distance: '10 km',
        bio: 'Cozinheiro de primeira classe. Procurando alguém para quem cozinhar meu melhor prato.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        job: 'Chef'
    },
    {
        id: 3,
        name: 'Robin',
        age: 28,
        distance: '15 km',
        bio: 'Arqueóloga. Gosto de livros antigos, café e silêncio. Nada de barulho desnecessário.',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        job: 'Arqueóloga'
    },
    {
        id: 4,
        name: 'Zoro',
        age: 21,
        distance: '1 km',
        bio: 'Espadachim. Gosto de sakê e dormir. Provavelmente vou me perder no caminho para o encontro.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        job: 'Espadachim'
    },
    {
        id: 5,
        name: 'Boa',
        age: 29,
        distance: '50 km',
        bio: 'Imperatriz Pirata. Apenas o melhor é suficiente. Você se considera digno?',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        job: 'Imperatriz'
    }
];

const MatchModal = ({ matchedProfile, userProfile, onClose }) => {
    if (!matchedProfile) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm mx-4 text-center">
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 italic tracking-tighter transform -rotate-6 filter drop-shadow-lg">
                        It's a Match!
                    </h1>
                    <p className="text-white/90 mt-2 font-medium">Vocês curtiram um ao outro!</p>
                </div>

                <div className="flex justify-center items-center gap-4 mb-10">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl transform -rotate-12 bg-gray-200">
                        <img
                            src={userProfile?.image || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                            alt="You"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-xl transform rotate-12 bg-gray-200">
                        <img src={matchedProfile.image} alt={matchedProfile.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-white font-bold shadow-lg shadow-rose-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2">
                        <MessageCircle size={20} />
                        Enviar Mensagem
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 bg-white/10 border-2 border-white/40 rounded-full text-white font-bold hover:bg-white/20 transition-colors"
                    >
                        Continuar Navegando
                    </button>
                </div>
            </div>
        </div>
    );
};

const Card = ({ profile, onSwipe, active }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleStart = (clientX, clientY) => {
        if (!active) return;
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging || !active) return;
        const deltaX = clientX - startPos.x;
        const deltaY = clientY - startPos.y;
        setCurrentPos({ x: deltaX, y: deltaY });
    };

    const handleEnd = () => {
        if (!active) return;
        setIsDragging(false);
        const threshold = 100;

        if (currentPos.x > threshold) {
            onSwipe('right');
        } else if (currentPos.x < -threshold) {
            onSwipe('left');
        } else {
            setCurrentPos({ x: 0, y: 0 });
        }
    };

    const rotation = currentPos.x * 0.1;
    const opacity = Math.min(Math.abs(currentPos.x) / 100, 1);
    const likeOpacity = currentPos.x > 0 ? opacity : 0;
    const nopeOpacity = currentPos.x < 0 ? opacity : 0;

    return (
        <div
            ref={cardRef}
            className={`absolute inset-0 w-full h-full rounded-3xl bg-white shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none origin-bottom ${active ? 'z-10' : 'z-0'}`}
            style={{
                transform: `translate(${currentPos.x}px, ${currentPos.y}px) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                display: active ? 'block' : 'none'
            }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleEnd}
        >
            <div className="relative w-full h-full">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover pointer-events-none" />

                <div className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-1 transform -rotate-12" style={{ opacity: likeOpacity }}>
                    <span className="text-4xl font-bold text-green-500 tracking-widest uppercase">LIKE</span>
                </div>
                <div className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-1 transform rotate-12" style={{ opacity: nopeOpacity }}>
                    <span className="text-4xl font-bold text-red-500 tracking-widest uppercase">NOPE</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
                    <div className="flex items-baseline gap-3 mb-2">
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
                        <span className="text-2xl font-light opacity-90">{profile.age}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 text-white/80">
                        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            <MapPin size={12} />
                            {profile.distance}
                        </div>
                        {profile.job && (
                            <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                {profile.job}
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                        {profile.bio}
                    </p>

                    <div className="mt-4 flex items-center justify-end">
                        <Info className="text-white/50 w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileSetup = ({ onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        age: initialData?.age || '',
        job: initialData?.job || '',
        bio: initialData?.bio || '',
        image: initialData?.image || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-rose-500 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-1">Seu Perfil</h2>
                    <p className="text-rose-100 text-sm">Como o mundo vai te ver</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 mb-4 group cursor-pointer">
                            <div className="w-full h-full rounded-full border-4 border-rose-100 overflow-hidden shadow-sm">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-rose-500 p-2 rounded-full text-white shadow-md">
                                <Camera size={16} />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">URL da Foto</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <User size={16} className="text-rose-500" /> Nome
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label className="text-sm font-bold text-slate-700 block">Idade</label>
                            <input
                                required
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-center"
                                placeholder="21"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <Briefcase size={16} className="text-rose-500" /> Profissão
                        </label>
                        <input
                            type="text"
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                            placeholder="O que você faz?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <FileText size={16} className="text-rose-500" /> Bio
                        </label>
                        <textarea
                            rows="3"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Conte algo interessante sobre você..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Salvar e Navegar
                        <ArrowLeft className="rotate-180" size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}

const MatchInterface = ({ userProfile }) => {
    const [profiles, setProfiles] = useState(MOCK_PROFILES);
    const [matchedProfile, setMatchedProfile] = useState(null);

    const swiped = (direction, profileId) => {
        if (direction === 'right') {
            const isMatch = Math.random() > 0.5;
            if (isMatch) {
                const profile = profiles.find(p => p.id === profileId);
                setTimeout(() => setMatchedProfile(profile), 300);
            }
        }

        setTimeout(() => {
            setProfiles(prev => prev.filter(p => p.id !== profileId));
        }, 200);
    };

    const handleManualSwipe = (direction) => {
        if (profiles.length === 0) return;
        const card = document.querySelector('.card-stack > div:last-child');
        if (card) {
            card.style.transition = 'transform 0.5s ease-out';
            const translate = direction === 'right' ? 1000 : -1000;
            const rotate = direction === 'right' ? 20 : -20;
            card.style.transform = `translate(${translate}px, 0) rotate(${rotate}deg)`;
            swiped(direction, profiles[profiles.length - 1].id);
        }
    };

    const resetDeck = () => {
        setProfiles(MOCK_PROFILES);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-slate-100 overflow-hidden font-sans">
            <MatchModal
                matchedProfile={matchedProfile}
                userProfile={userProfile}
                onClose={() => setMatchedProfile(null)}
            />

            <header className="px-4 py-3 flex items-center justify-between bg-white shadow-sm z-20">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <img src={userProfile?.image} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-1">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                        Love Builder
                    </h1>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400">
                    <MessageCircle size={24} />
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4 relative max-w-md mx-auto w-full">
                <div className="relative w-full aspect-[3/4] max-h-[600px] card-stack">
                    {profiles.length > 0 ? (
                        profiles.map((profile, index) => (
                            <Card
                                key={profile.id}
                                profile={profile}
                                active={index === profiles.length - 1}
                                onSwipe={(dir) => swiped(dir, profile.id)}
                            />
                        ))
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl text-center p-8">
                            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                <Heart className="w-10 h-10 text-rose-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Sem novos perfis</h3>
                            <p className="text-slate-500 mb-6">Explore mares distantes ou verifique suas configurações de busca.</p>
                            <button
                                onClick={resetDeck}
                                className="px-8 py-3 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
                            >
                                Recarregar Deck
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-6 mt-8 w-full max-w-xs">
                    <button
                        onClick={() => handleManualSwipe('left')}
                        disabled={profiles.length === 0}
                        className="w-14 h-14 rounded-full bg-white text-rose-500 shadow-xl flex items-center justify-center hover:scale-110 hover:bg-rose-50 transition-all disabled:opacity-50 disabled:hover:scale-100 ring-1 ring-slate-100"
                    >
                        <X size={28} strokeWidth={3} />
                    </button>

                    <button
                        className="w-10 h-10 rounded-full bg-white text-blue-400 shadow-lg flex items-center justify-center hover:scale-110 hover:bg-blue-50 transition-all disabled:opacity-50 ring-1 ring-slate-100"
                    >
                        <Star size={20} fill="currentColor" className="text-blue-400" />
                    </button>

                    <button
                        onClick={() => handleManualSwipe('right')}
                        disabled={profiles.length === 0}
                        className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-xl shadow-pink-200 flex items-center justify-center hover:scale-110 hover:brightness-110 transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <Heart size={28} fill="currentColor" />
                    </button>
                </div>
            </main>
        </div>
    );
};

const WelcomeGate = ({ onJoin }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-gradient-to-br from-rose-500 to-pink-700 items-center justify-center p-6 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="relative z-10 max-w-md w-full">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center backdrop-blur-md shadow-2xl border-2 border-white/30 animate-pulse">
                    <Anchor size={64} className="text-white drop-shadow-md" />
                </div>

                <h1 className="text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                    Love Builder
                </h1>
                <p className="text-xl text-pink-100 mb-10 font-medium leading-relaxed">
                    O mar é vasto, mas ninguém precisa navegar sozinho. 
                </p>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md border border-white/20 mb-10 shadow-xl">
                    <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
                        <Info size={20} />
                        Termos de Embarque
                    </h3>
                    <p className="text-sm text-pink-50/80 mb-4">
                        Ao entrar, você concorda em compartilhar seu perfil com outras pessoas em busca de match.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs opacity-70">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                        <span>3 online agora</span>
                    </div>
                </div>

                <button
                    onClick={onJoin}
                    className="w-full bg-white text-rose-600 font-black py-4 rounded-xl text-xl shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                    <Heart className="group-hover:text-rose-500 transition-colors fill-rose-600" />
                    Quero Participar!
                </button>
            </div>
        </div>
    );
};

export default function Match() {
    const [user, setUser] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await signInWithCustomToken(auth, __initial_auth_token);
            } else {
                await signInAnonymously(auth);
            }
        };
        initAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const unsubPreferences = onSnapshot(
            doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'preferences'),
            (docSnap) => {
                if (docSnap.exists() && docSnap.data().joined_love_builder) {
                    setHasJoined(true);
                } else {
                    setHasJoined(false);
                }
            }
        );

        const unsubProfile = onSnapshot(
            doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'profile'),
            (docSnap) => {
                if (docSnap.exists()) {
                    setProfileData(docSnap.data());
                } else {
                    setProfileData(null);
                }
                setLoading(false);
            }
        );

        return () => {
            unsubPreferences();
            unsubProfile();
        };
    }, [user]);

    const handleJoin = async () => {
        if (!user) return;
        try {
            await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'settings', 'preferences'), {
                joined_love_builder: true,
                joined_at: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error("Erro ao entrar:", error);
        }
    };

    const handleSaveProfile = async (data) => {
        if (!user) return;
        try {
            await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'profile'), {
                ...data,
                updated_at: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
        }
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-100 text-slate-400">
                <Anchor className="animate-bounce w-12 h-12" />
            </div>
        );
    }

    if (hasJoined && profileData) {
        return <MatchInterface userProfile={profileData} />;
    }

    if (hasJoined && !profileData) {
        return <ProfileSetup onSave={handleSaveProfile} />;
    }

    return <WelcomeGate onJoin={handleJoin} />;
}