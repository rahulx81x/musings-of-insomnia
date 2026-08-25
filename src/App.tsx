import { useState, useEffect } from 'react';
import { parseAnthology } from './lib/parseMarkdown';
import type { Anthology } from './lib/types';
import CanvasBackground from './canvas/CanvasBackground';
import HeroSection from './components/HeroSection';
import EpigraphSection from './components/EpigraphSection';
import PoemSection from './components/PoemSection';
import ActDivider from './components/ActDivider';
import EpilogueSection from './components/EpilogueSection';
import FeedbackSection from './components/FeedbackSection';
import CreditsSection from './components/CreditsSection';
import HUD from './components/HUD';
import { useLenis } from './hooks/useLenis';
import { useActiveSection } from './hooks/useActiveSection';
import { useVigilMode } from './hooks/useVigilMode';
import { useAmbientAudio } from './hooks/useAmbientAudio';

export default function App() {
  const [anthology, setAnthology] = useState<Anthology | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { scrollTo } = useLenis();
  const activeSection = useActiveSection(anthology !== null);
  const isVigil = useVigilMode();
  const { isMuted, isLoaded: isAudioLoaded, volume, setVolume, toggleMute } = useAmbientAudio();

  useEffect(() => {
    parseAnthology()
      .then(setAnthology)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-cream)',
        fontFamily: 'var(--font-body)',
      }}>
        <p>Failed to load anthology: {error}</p>
      </div>
    );
  }

  if (!anthology) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'var(--accent-gold)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      </div>
    );
  }

  return (
    <>
      {/* Generative background canvas */}
      <CanvasBackground activeMode={activeSection.canvasMode} />

      {/* Floating HUD */}
      <HUD
        activeSection={activeSection}
        progress={activeSection.progress}
        isMuted={isMuted}
        isAudioLoaded={isAudioLoaded}
        volume={volume}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        isVigil={isVigil}
        anthology={anthology}
        onNavigate={scrollTo}
      />

      {/* Main content */}
      <main
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="content-container">
          {/* Hero */}
          <HeroSection
            title={anthology.title}
            subtitle={anthology.subtitle}
            author={anthology.author}
          />

          {/* Front-matter Epigraph */}
          <EpigraphSection text={anthology.epigraph} />

          {/* Prologue */}
          <PoemSection
            poem={anthology.prologue}
            actTitle="Prologue · The Genesis"
          />

          {/* Acts & Poems */}
          {anthology.acts.map((act) => (
            <div key={act.number}>
              <ActDivider act={act} />
              {act.poems.map((poem) => (
                <PoemSection
                  key={poem.id}
                  poem={poem}
                  actIndex={act.number - 1}
                  actTitle={`Act ${['I', 'II', 'III', 'IV', 'V'][act.number - 1]} · ${act.title}`}
                />
              ))}
            </div>
          ))}

          {/* Epilogue */}
          <EpilogueSection
            epilogue={anthology.epilogue}
            author={anthology.author}
          />

          {/* Reader Feedback */}
          <FeedbackSection />

          {/* Credits & Acknowledgements */}
          <CreditsSection
            author={anthology.author}
          />
        </div>
      </main>
    </>
  );
}
