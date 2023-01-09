import React, { useEffect, useRef, useState } from 'react'
import { styled } from '../../styles/theme'

const Try: React.FC = () => {
    const ref = useRef<SVGSVGElement>(null)

    const [d, setD] = useState('')

    useEffect(() => {
        if (ref.current) {
            const { height, width } = ref.current.getBoundingClientRect()
            setD(`M 0 ${height * 0.5}  C ${width * 0.15} 0, ${width * 0.35} 0, ${width * 0.3} ${height * 0.5} `)
        }
    }, [ref])
    return (
        <Container>
            <Svg width="100%" height="100%" ref={ref}>
                <Path d={d} stroke="blue" />
            </Svg>
        </Container>
    )
}

export default Try

const Container = styled.div`
    width: 100%;
    height: 20rem;
    border-radius: 4px;
    overflow: hidden;
`

const Svg = styled.svg``
const Path = styled.path``
