import {useDocumentHead, useLocation} from "@builder.io/qwik-city"
import {component$, Fragment} from "@builder.io/qwik"

/**
 * The `Head` component is placed inside of the document `<head>` element.
 */
export const Head = component$(() => {
  const head = useDocumentHead()
  const loc = useLocation()

  return (
    <Fragment>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {head.meta.map(m => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map(l => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map(s => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </Fragment>
  )
})
