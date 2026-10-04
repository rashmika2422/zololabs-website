/** A decorative product diagram, built with CSS rather than heavy canvas effects. */
export function ProductBlueprint() {
  return <div className="product-blueprint" aria-hidden="true">
    <div className="blueprint-top"><span><i />PRODUCT ENGINEERING</span><span>ZOLO / 01</span></div>
    <div className="blueprint-orbit orbit-one" /><div className="blueprint-orbit orbit-two" />
    <div className="blueprint-connection" />
    <div className="blueprint-platform">
      <div className="platform-toolbar"><span className="platform-logo">z.</span><span>Workspace</span><span className="platform-toolbar-dots">•••</span></div>
      <div className="platform-body">
        <div className="platform-sidebar"><i className="active" /><i /><i /><i /><i /></div>
        <div className="platform-content">
          <span className="blueprint-label">BUSINESS OVERVIEW</span>
          <div className="platform-skeleton"><i /><i /></div>
          <div className="platform-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="platform-rows"><span /><span /><span /></div>
        </div>
      </div>
      <div className="platform-bottom"><i />Connected operations<span>↗</span></div>
    </div>
    <div className="blueprint-mobile">
      <div className="mobile-speaker" />
      <div className="mobile-app-top"><span className="platform-logo">z.</span><i /></div>
      <span className="mobile-app-greeting">Made for<br /><strong>your everyday.</strong></span>
      <div className="mobile-feature"><span className="mobile-feature-symbol">↗</span><i /><i /></div>
      <div className="mobile-app-tiles"><div /><div /></div>
      <div className="mobile-app-lines"><i /><i /></div>
      <div className="mobile-app-nav"><i /><i /><i /></div>
      <div className="mobile-home-bar" />
    </div>
    <span className="blueprint-node node-one" /><span className="blueprint-node node-two" />
    <span className="blueprint-side-label">DESIGNED TO CONNECT</span>
    <div className="blueprint-bottom"><span>Mobile + platform.</span><span>One connected experience.</span></div>
  </div>;
}
