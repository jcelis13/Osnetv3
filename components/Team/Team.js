import styled from 'styled-components'

const StyledContainer = styled.div`
  margin-top: 20px;
  padding: 5px;
  margin: 0 auto;
  text-align: center;
`;
const StyledImg = styled.img`
  margin: 0 auto;
  width: 100px;
  display: inline-block
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.1s;
  &:hover,
  &:active,
  &:focus {
    transform: scale(1.1);
  }
`;
const StyledSpan = styled.span`
    font-size: .9em;
    font-weight: 700;
    display: inline-block
`;
const StyledTeam = styled.div`
    width: 30%;
    display: inline-block;
`

const url = 'https://awesomev3.s3-ap-southeast-1.amazonaws.com/pp/';

const Team = ({ teams }) => (
    <StyledContainer>
        { teams.map(team => (
            <StyledTeam key={team.id}>
            {/* <StyledImg src= {team.profile_picture ? url + team.profile_picture : url + 'default-profile.png' } /> */}
            <StyledImg src="/static/default-profile.png"/>
            <StyledSpan >{team.full_name}</StyledSpan>
            </StyledTeam>
        ))}

    </StyledContainer>
)

export default Team;