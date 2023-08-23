package rocks.zipcode.gg_tarot_go.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import rocks.zipcode.gg_tarot_go.domain.Card;
import rocks.zipcode.gg_tarot_go.repository.CardRepository;
import rocks.zipcode.gg_tarot_go.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rocks.zipcode.gg_tarot_go.domain.Card}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CardResource {

    private final Logger log = LoggerFactory.getLogger(CardResource.class);

    private static final String ENTITY_NAME = "card";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CardRepository cardRepository;

    public CardResource(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    /**
     * {@code POST  /cards} : Create a new card.
     *
     * @param card the card to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new card, or with status {@code 400 (Bad Request)} if the card has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cards")
    public ResponseEntity<Card> createCard(@RequestBody Card card) throws URISyntaxException {
        log.debug("REST request to save Card : {}", card);
        if (card.getId() != null) {
            throw new BadRequestAlertException("A new card cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Card result = cardRepository.save(card);
        return ResponseEntity
            .created(new URI("/api/cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cards/:id} : Updates an existing card.
     *
     * @param id the id of the card to save.
     * @param card the card to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated card,
     * or with status {@code 400 (Bad Request)} if the card is not valid,
     * or with status {@code 500 (Internal Server Error)} if the card couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cards/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable(value = "id", required = false) final Long id, @RequestBody Card card)
        throws URISyntaxException {
        log.debug("REST request to update Card : {}, {}", id, card);
        if (card.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, card.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Card result = cardRepository.save(card);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, card.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cards/:id} : Partial updates given fields of an existing card, field will ignore if it is null
     *
     * @param id the id of the card to save.
     * @param card the card to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated card,
     * or with status {@code 400 (Bad Request)} if the card is not valid,
     * or with status {@code 404 (Not Found)} if the card is not found,
     * or with status {@code 500 (Internal Server Error)} if the card couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Card> partialUpdateCard(@PathVariable(value = "id", required = false) final Long id, @RequestBody Card card)
        throws URISyntaxException {
        log.debug("REST request to partial update Card partially : {}, {}", id, card);
        if (card.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, card.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Card> result = cardRepository
            .findById(card.getId())
            .map(existingCard -> {
                if (card.getName() != null) {
                    existingCard.setName(card.getName());
                }
                if (card.getImageURL() != null) {
                    existingCard.setImageURL(card.getImageURL());
                }
                if (card.getDescription() != null) {
                    existingCard.setDescription(card.getDescription());
                }

                return existingCard;
            })
            .map(cardRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, card.getId().toString())
        );
    }

    /**
     * {@code GET  /cards} : get all the cards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cards in body.
     */
    @GetMapping("/cards")
    public List<Card> getAllCards() {
        log.debug("REST request to get all Cards");
        return cardRepository.findAll();
    }

    /**
     * {@code GET  /cards/:id} : get the "id" card.
     *
     * @param id the id of the card to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the card, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cards/{id}")
    public ResponseEntity<Card> getCard(@PathVariable Long id) {
        log.debug("REST request to get Card : {}", id);
        Optional<Card> card = cardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(card);
    }

    /**
     * {@code DELETE  /cards/:id} : delete the "id" card.
     *
     * @param id the id of the card to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cards/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        log.debug("REST request to delete Card : {}", id);
        cardRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
