import React from 'react'
import { ExtendableStyles, Testable } from 'utils/react'

import clsx from 'clsx'
import { makeStyles, AppTheme } from 'services/theme'
import { GiphyData } from 'app/entities/giphy'
import { Title, Subtitle, Body } from 'app/components'

export type GalleryImageDetailsInformationProps = ExtendableStyles &
  Testable & {
    data: GiphyData
  }

export function GalleryImageDetailsInformation({
  className,
  data,
  ...otherProps
}: GalleryImageDetailsInformationProps) {
  const classes = useStyles()
  const { title, username, rating, bitly_url, slug } = data
  return (
    <div className={clsx(className, classes.informationContainer)} {...otherProps}>
      <Title className={classes.title}>{removeUserFromTitle(title)}</Title>
      <Subtitle>
        By <strong>{username}</strong>
      </Subtitle>
      <div className={classes.extraInformation}>
        <Body className={classes.extraInformationLabel}>
          <strong>Rating: </strong>
          {rating}
        </Body>
        <Body className={classes.extraInformationLabel}>
          <strong>Original url: </strong>
          <a href={bitly_url} target="_blank" rel="noopener noreferrer">
            {bitly_url}
          </a>
        </Body>
        <Body className={classes.extraInformationLabel}>
          <strong>Slug: </strong>
          {slug}
        </Body>
      </div>
    </div>
  )
}

function removeUserFromTitle(title: string) {
  const regex = new RegExp(/by\s+\w+/)
  return title.replace(regex, '')
}

const useStyles = makeStyles(({ spacing, typography, breakpoints }: AppTheme) => ({
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(3),
    [breakpoints.down(breakpoints.values.md)]: {
      textAlign: 'center',
    },
  },
  title: {
    marginBottom: spacing(0.5),
    [breakpoints.down(breakpoints.values.md)]: {
      margin: 0,
    },
  },
  extraInformation: {
    marginTop: spacing(10),
    [breakpoints.down(breakpoints.values.md)]: {
      marginTop: spacing(3),
    },
  },
  extraInformationLabel: {
    fontSize: typography.sizes.L,
    marginBottom: spacing(),
  },
}))
