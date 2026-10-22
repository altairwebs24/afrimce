<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site media (photos + hero video) live in the public `media` storage bucket; reference via `media(name)` in src/lib/site.ts, not bundled asset pointers.
- Customer reviews are stored in Lovable Cloud, read and submitted through validated public server functions using the publishable client and RLS; homepage reads use TanStack Query loader hydration so submissions persist across visitors.
