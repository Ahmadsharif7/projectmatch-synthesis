// Synthesis Capability Profile View (Maya Chen)

export class ProfileView {
  constructor(app) {
    this.app = app;
    this.isEditing = false;
  }

  render(container) {
    const profile = this.app.state.profile;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px; padding-bottom: 24px;">
        
        <!-- Profile Header Section -->
        <header class="glass-panel lens-flare slide-up" style="padding: 32px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px;">
          
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
            <!-- Avatar with glow -->
            <div style="position: relative; width: 110px; height: 110px; border-radius: var(--radius-xl); overflow: hidden; border: 2px solid rgba(208, 188, 255, 0.4); box-shadow: 0 0 30px rgba(139, 92, 246, 0.35); flex-shrink: 0;">
              <img src="${profile.avatar}" alt="${profile.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>

            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span class="badge-high-signal" style="background: rgba(93, 230, 255, 0.15); color: var(--color-secondary); border-color: rgba(93, 230, 255, 0.3);">
                  VERIFIED TOPOLOGY
                </span>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
                  ID: ${profile.id}
                </span>
              </div>

              <h1 style="font-family: var(--font-headline); font-size: clamp(28px, 4vw, 38px); font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 6px;">
                ${profile.name}
              </h1>
              <p style="font-size: 14px; color: var(--color-primary); font-weight: 500; margin-bottom: 12px;">
                ${profile.role}
              </p>

              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: rgba(30, 32, 34, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-full); font-family: var(--font-mono); font-size: 11px; color: var(--color-secondary);">
                  <span class="material-symbols-outlined" style="font-size: 15px;">location_on</span>
                  ${profile.location}
                </div>
                <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(208, 188, 255, 0.3); border-radius: var(--radius-full); font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);">
                  <span class="material-symbols-outlined" style="font-size: 15px;">schedule</span>
                  ${profile.availability}
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <button class="btn-ghost" id="toggle-edit-signature-btn">
              <span class="material-symbols-outlined" style="font-size: 18px;">tune</span>
              ${this.isEditing ? 'Save Signature' : 'Tune Weights'}
            </button>
            <button class="btn-primary" id="profile-propose-btn">
              <span class="material-symbols-outlined" style="font-size: 18px;">handshake</span>
              Propose Match
            </button>
          </div>

        </header>

        <!-- Bento Grid: Capability Signature (Left) + Selected Builds (Right) -->
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;" class="profile-bento-grid">
          
          <!-- Capability Signature Panel -->
          <section class="glass-panel lens-flare slide-up delay-100" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">radar</span>
                <h2 style="font-family: var(--font-headline); font-size: 20px; color: #FFFFFF; font-weight: 700;">
                  Capability Signature
                </h2>
              </div>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); font-weight: 600;">
                94.2% RES-INDEX
              </span>
            </div>

            <p style="font-size: 13.5px; color: var(--color-on-surface-variant); line-height: 1.5;">
              ${profile.bio}
            </p>

            <!-- Signature Progress Items / Sliders -->
            <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 8px;">
              ${profile.capabilitySignature.map((item, index) => {
                const colorHex = item.color === 'primary' ? '#8B5CF6' : item.color === 'secondary' ? '#22D3EE' : item.color === 'tertiary' ? '#FBABFF' : '#A7B0C0';
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 12px; margin-bottom: 8px;">
                      <span style="color: #FFFFFF; font-weight: 500;">${item.label}</span>
                      <span style="color: ${colorHex}; font-weight: 700;" id="score-text-${index}">${item.score}%</span>
                    </div>

                    ${this.isEditing ? `
                      <input type="range" min="50" max="100" value="${item.score}" class="signature-range-input" data-index="${index}" style="width: 100%; accent-color: ${colorHex}; cursor: pointer;" />
                    ` : `
                      <div style="height: 6px; background: var(--color-surface-container-highest); border-radius: var(--radius-full); overflow: hidden;">
                        <div style="height: 100%; width: ${item.score}%; background: ${colorHex}; border-radius: var(--radius-full); box-shadow: 0 0 10px ${colorHex}; transition: width 0.4s ease;"></div>
                      </div>
                    `}
                  </div>
                `;
              }).join('')}
            </div>

            <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-family: var(--font-mono); font-size: 11px; color: var(--color-text-muted);">
              Signature weights dynamically tune AI recommendation density.
            </div>
          </section>

          <!-- Selected Builds Panel -->
          <section class="glass-panel lens-flare slide-up delay-200" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 22px;">architecture</span>
                <h2 style="font-family: var(--font-headline); font-size: 20px; color: #FFFFFF; font-weight: 700;">
                  Selected Builds
                </h2>
              </div>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-secondary);">
                3 VERIFIED PRODUCTION BUILDS
              </span>
            </div>

            <!-- Builds Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;">
              ${profile.selectedBuilds.map(build => `
                <div class="glass-card build-card" style="overflow: hidden; border-radius: var(--radius-lg); position: relative; display: flex; flex-direction: column; height: 210px; cursor: pointer;">
                  
                  <div style="background-image: url('${build.image}'); background-size: cover; background-position: center; width: 100%; height: 100%; position: absolute; inset: 0; opacity: 0.45; transition: all 0.3s ease; mix-blend-mode: luminosity;" class="build-bg-img"></div>
                  
                  <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,10,15,0.2) 0%, rgba(7,10,15,0.95) 100%);"></div>

                  <div style="position: relative; z-index: 2; padding: 16px; margin-top: auto; display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 2px;">
                      ${build.tags.map(t => `<span class="tech-chip" style="font-size: 9.5px; padding: 2px 6px; background: rgba(7,10,15,0.8);">${t}</span>`).join('')}
                    </div>

                    <h3 style="font-family: var(--font-headline); font-size: 17px; color: #FFFFFF; font-weight: 700;">
                      ${build.title}
                    </h3>
                    <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      ${build.description}
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>

          </section>

        </div>

      </div>
    `;

    // Add inline responsive styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (min-width: 960px) {
        .profile-bento-grid {
          grid-template-columns: 420px 1fr !important;
        }
      }
      .build-card:hover .build-bg-img {
        opacity: 0.8 !important;
        transform: scale(1.05);
        mix-blend-mode: normal !important;
      }
    `;
    container.appendChild(styleEl);

    // Event handlers
    document.getElementById('toggle-edit-signature-btn')?.addEventListener('click', () => {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.app.saveState();
        this.app.showToast('Capability signature weights updated successfully!', 'success');
      }
      this.render(container);
    });

    document.getElementById('profile-propose-btn')?.addEventListener('click', () => {
      this.app.modals.openCommandPalette();
    });

    if (this.isEditing) {
      container.querySelectorAll('.signature-range-input').forEach(input => {
        input.addEventListener('input', (e) => {
          const index = parseInt(input.getAttribute('data-index'));
          const newVal = parseInt(e.target.value);
          this.app.state.profile.capabilitySignature[index].score = newVal;
          const scoreText = document.getElementById(`score-text-${index}`);
          if (scoreText) scoreText.innerText = `${newVal}%`;
        });
      });
    }
  }

  destroy() {}
}
