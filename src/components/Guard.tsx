import { Component, type ReactNode } from 'react';

/**
 * Страховка от белого экрана: если один блок падает,
 * страница остаётся живой, а на месте блока — понятная заглушка.
 */
export default class Guard extends Component<{ children: ReactNode; name?: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="section">
          <div className="wrap">
            <p className="micro">Техническая пауза</p>
            <p style={{ marginTop: 10, fontSize: 'var(--fs-19)', color: 'var(--ink-2)' }}>
              Этот блок не загрузился. Позвоните нам — назовём цену и подберём время:{' '}
              <a href="tel:+375296185321" style={{ color: 'var(--teal)', fontWeight: 700 }}>
                +375 29 618-53-21
              </a>
            </p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
