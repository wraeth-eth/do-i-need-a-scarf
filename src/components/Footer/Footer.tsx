import { ExternalLink } from '@components/ExternalLink'
import { GitHub } from '@components/icons/GitHub'
import { Twitter } from '@components/icons/Twitter'

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex w-screen justify-center p-2">
      <div className="flex flex-col gap-4 text-center">
        <div className="flex gap-3">
          <ExternalLink href="https://github.com/wraeth-eth/do-i-need-a-scarf">
            <GitHub className="w-6 fill-white" />
          </ExternalLink>
          <ExternalLink href="https://twitter.com/lachmcculloch">
            <Twitter className="w-6 fill-white" />
          </ExternalLink>
        </div>
        2022
      </div>
    </footer>
  )
}
