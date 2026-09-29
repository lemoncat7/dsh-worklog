export const name = 'dsh-worklog-client'
export const inject = ['uiWorkspace']
// Knowledge owns the workspace UI. This bridge only opens cited conversations.
export function apply(ctx) {
  const onMessage = event => {
    if (event.data?.type !== '@lemoncat7/dsh-worklog/open-session') return
    const frame = document.querySelector('.dsh-knowledge-frame')
    if (!frame || event.source !== frame.contentWindow || event.origin !== new URL(frame.src, location.href).origin) return
    const sessionId = event.data.sessionId
    if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 256) return
    ctx.uiWorkspace.openSession(sessionId)
    window.dispatchEvent(new CustomEvent('@lemoncat7/dsh-plugin-ui/workspace-activate', { detail: { pluginId: 'conversation' } }))
  }
  window.addEventListener('message', onMessage)
  ctx.effect(() => () => window.removeEventListener('message', onMessage), 'worklog.navigation')
}
