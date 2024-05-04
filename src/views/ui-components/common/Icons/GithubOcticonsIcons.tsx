import IconWrapper from './IconWrapper'
import {
    GoFlame,
    GoGitCompare,
    GoGitCommit,
    GoGitPullRequest,
    GoCode,
    GoTerminal,
} from 'react-icons/go'

const renderIcon = [
    { render: () => <GoFlame /> },
    { render: () => <GoGitCompare /> },
    { render: () => <GoGitCommit /> },
    { render: () => <GoGitPullRequest /> },
    { render: () => <GoCode /> },
    { render: () => <GoTerminal /> },
]

const GithubOcticonsIcons = () => {
    return (
        <div className="grid grid-cols-3 gap-y-6 text-4xl text-center heading-text">
            {renderIcon.map((icon, index) => (
                <IconWrapper key={`githubOcticonsIcons-${index}`}>
                    {icon.render()}
                </IconWrapper>
            ))}
        </div>
    )
}

export default GithubOcticonsIcons
