"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Plus, Printer, Check, X, Trash2, ChevronRight, Users } from "lucide-react";

// Types
type Statut = "en_attente" | "confirme" | "annule";

type Reservation = {
  _id: Id<"reservations">;
  _creationTime: number;
  spectacleId: Id<"spectacles">;
  representationIndex: number;
  nom: string;
  email: string;
  telephone?: string;
  nbPlaces: number;
  statut: Statut;
  notes?: string;
};

type Representation = {
  date: string;
  heure: string;
  lieu: string;
  places: number;
};

// Constantes de style
const INPUT =
  "w-full border-2 border-encre rounded-xl px-4 py-2.5 font-sans text-sm bg-creme focus:outline-none focus:border-tomate-400";
const BTN_SM =
  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 rounded-lg transition-colors";

// Badge statut
function BadgeStatut({ statut }: { statut: Statut }) {
  if (statut === "confirme") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
        <Check size={11} /> Confirmé
      </span>
    );
  }
  if (statut === "annule") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-300">
        <X size={11} /> Annulé
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-300">
      En attente
    </span>
  );
}

// Formulaire d'ajout de réservation
function FormulaireAjout({
  spectacleId,
  representationIndex,
  onClose,
}: {
  spectacleId: Id<"spectacles">;
  representationIndex: number;
  onClose: () => void;
}) {
  const create = useMutation(api.reservations.create);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nbPlaces, setNbPlaces] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom || !email || nbPlaces < 1) return;
    setLoading(true);
    try {
      await create({
        spectacleId,
        representationIndex,
        nom,
        email,
        telephone: telephone || undefined,
        nbPlaces,
        notes: notes || undefined,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-creme-pale border-2 border-encre rounded-xl p-5 mb-5 shadow-card"
    >
      <h3
        className="font-bold text-lg text-encre mb-4"
        style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
      >
        Nouvelle réservation
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">
            Nom *
          </label>
          <input
            className={INPUT}
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Dupont Marie"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            className={INPUT}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="marie@exemple.fr"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">
            Téléphone
          </label>
          <input
            className={INPUT}
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="06 12 34 56 78"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">
            Nb de places *
          </label>
          <input
            type="number"
            className={INPUT}
            value={nbPlaces}
            min={1}
            max={10}
            onChange={(e) => setNbPlaces(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-xs font-bold text-encre-douce uppercase tracking-wider">
          Notes
        </label>
        <input
          className={INPUT}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Informations complémentaires…"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !nom || !email}
          className="btn-acap px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Enregistrement…" : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 border-2 border-encre rounded-xl font-bold text-sm text-encre bg-creme hover:bg-creme-deep transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

// Panneau droite : détail des réservations d'une représentation
function PanneauDetail({
  spectacleTitre,
  representation,
  spectacleId,
  representationIndex,
}: {
  spectacleTitre: string;
  representation: Representation;
  spectacleId: Id<"spectacles">;
  representationIndex: number;
}) {
  const reservations = useQuery(api.reservations.list, {
    spectacleId,
    representationIndex,
  }) as Reservation[] | undefined;

  const updateStatut = useMutation(api.reservations.updateStatut);
  const remove = useMutation(api.reservations.remove);

  const [showForm, setShowForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Calcul local des places réservées (hors annulées)
  const placesReservees =
    reservations
      ?.filter((r) => r.statut !== "annule")
      .reduce((sum, r) => sum + r.nbPlaces, 0) ?? 0;

  const placesTotal = representation.places;
  const tauxRemplissage =
    placesTotal > 0 ? Math.min((placesReservees / placesTotal) * 100, 100) : 0;

  // Couleur de la barre de progression
  let barreColor = "bg-emerald-500";
  if (tauxRemplissage >= 100) barreColor = "bg-red-500";
  else if (tauxRemplissage >= 80) barreColor = "bg-amber-500";

  // Résumé
  const totalConfirmes =
    reservations
      ?.filter((r) => r.statut === "confirme")
      .reduce((sum, r) => sum + r.nbPlaces, 0) ?? 0;
  const totalEnAttente =
    reservations
      ?.filter((r) => r.statut === "en_attente")
      .reduce((sum, r) => sum + r.nbPlaces, 0) ?? 0;

  async function handleUpdateStatut(id: Id<"reservations">, statut: Statut) {
    await updateStatut({ id, statut });
  }

  async function handleDelete(id: Id<"reservations">) {
    await remove({ id });
    setConfirmDeleteId(null);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* En-tête représentation */}
      <div className="bg-creme-pale border-2 border-encre rounded-xl p-5 shadow-card">
        <h2
          className="font-black text-xl text-encre mb-1"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
        >
          {spectacleTitre}
        </h2>
        <p className="text-sm text-encre-douce mb-4">
          {representation.date} à {representation.heure} — {representation.lieu}
        </p>

        {/* Compteur de places */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-black text-encre">
            {placesReservees}
          </span>
          <span className="text-xl text-encre-douce font-bold">
            / {placesTotal} places réservées
          </span>
          {tauxRemplissage >= 100 && (
            <span className="ml-auto text-xs font-bold text-red-600 bg-red-100 border border-red-300 px-2.5 py-1 rounded-full">
              COMPLET
            </span>
          )}
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-creme-deep rounded-full h-3 overflow-hidden border border-encre-soft">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barreColor}`}
            style={{ width: `${tauxRemplissage}%` }}
          />
        </div>
        <div className="text-xs text-encre-douce mt-1 text-right">
          {Math.round(tauxRemplissage)}% rempli
        </div>
      </div>

      {/* Bouton ajouter */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-acap inline-flex self-start"
        >
          <Plus size={16} /> Ajouter une réservation
        </button>
      )}

      {/* Formulaire inline */}
      {showForm && (
        <FormulaireAjout
          spectacleId={spectacleId}
          representationIndex={representationIndex}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Chargement */}
      {reservations === undefined && (
        <div className="text-center py-10 text-encre-douce">Chargement…</div>
      )}

      {/* Liste des réservations */}
      {reservations !== undefined && reservations.length === 0 && (
        <div className="text-center py-10 text-encre-douce italic bg-creme-pale border-2 border-encre rounded-xl">
          Aucune réservation pour cette représentation.
        </div>
      )}

      {reservations !== undefined && reservations.length > 0 && (
        <div className="bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card">
          {/* En-tête tableau */}
          <div className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-3 px-4 py-2.5 bg-creme-deep border-b-2 border-encre text-xs font-bold text-encre-douce uppercase tracking-wider">
            <span>Nom</span>
            <span>Email / Tel.</span>
            <span className="text-center">Places</span>
            <span>Statut</span>
            <span className="col-span-2">Actions</span>
          </div>

          {/* Lignes */}
          {reservations.map((r) => (
            <div
              key={r._id}
              className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-3 px-4 py-3 border-b border-encre-soft last:border-b-0 items-center text-sm hover:bg-creme transition-colors"
            >
              <div>
                <div className="font-bold text-encre">{r.nom}</div>
                {r.notes && (
                  <div className="text-xs text-encre-douce italic truncate max-w-[160px]">
                    {r.notes}
                  </div>
                )}
              </div>
              <div>
                <div className="text-encre truncate">{r.email}</div>
                {r.telephone && (
                  <div className="text-xs text-encre-douce">{r.telephone}</div>
                )}
              </div>
              <div className="text-center font-bold text-encre">
                {r.nbPlaces}
              </div>
              <div>
                <BadgeStatut statut={r.statut} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {r.statut === "en_attente" && (
                  <button
                    onClick={() =>
                      handleUpdateStatut(r._id, "confirme")
                    }
                    title="Confirmer"
                    className={`${BTN_SM} border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100`}
                  >
                    <Check size={13} /> Confirmer
                  </button>
                )}
                {(r.statut === "en_attente" || r.statut === "confirme") && (
                  <button
                    onClick={() =>
                      handleUpdateStatut(r._id, "annule")
                    }
                    title="Annuler"
                    className={`${BTN_SM} border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100`}
                  >
                    <X size={13} /> Annuler
                  </button>
                )}
              </div>

              {/* Supprimer */}
              <div>
                <button
                  onClick={() => setConfirmDeleteId(r._id)}
                  title="Supprimer"
                  className="p-1.5 rounded-lg border-2 border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Résumé */}
      {reservations !== undefined && reservations.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[140px] bg-creme-pale border-2 border-encre rounded-xl px-4 py-3 text-center shadow-card">
            <div className="text-2xl font-black text-encre">{placesReservees}</div>
            <div className="text-xs text-encre-douce font-bold uppercase tracking-wider">
              Places réservées
            </div>
          </div>
          <div className="flex-1 min-w-[140px] bg-creme-pale border-2 border-emerald-400 rounded-xl px-4 py-3 text-center shadow-card">
            <div className="text-2xl font-black text-emerald-700">{totalConfirmes}</div>
            <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
              Confirmées
            </div>
          </div>
          <div className="flex-1 min-w-[140px] bg-creme-pale border-2 border-amber-400 rounded-xl px-4 py-3 text-center shadow-card">
            <div className="text-2xl font-black text-amber-700">{totalEnAttente}</div>
            <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">
              En attente
            </div>
          </div>
        </div>
      )}

      {/* Bouton imprimer */}
      {reservations !== undefined && reservations.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => window.print()}
            className={`${BTN_SM} border-encre text-encre bg-creme hover:bg-creme-deep`}
          >
            <Printer size={14} /> Imprimer
          </button>
        </div>
      )}

      {/* Modale confirmation suppression */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 bg-encre/50 z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="bg-creme-pale border-[3px] border-encre rounded-xl p-8 max-w-sm w-full shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="font-bold text-2xl text-encre mb-4"
              style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
            >
              Supprimer cette réservation ?
            </h2>
            <p className="text-sm text-encre-douce mb-6">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleDelete(confirmDeleteId as Id<"reservations">)
                }
                className="btn-acap flex-1 justify-center text-base py-3"
              >
                Supprimer
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-3 px-4 border-2 border-encre rounded-xl font-bold text-encre bg-creme"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant principal
export default function AdminReservationsPage() {
  const spectacles = useQuery(api.spectacles.list);

  // Sélection courante : spectacleId + representationIndex
  const [selection, setSelection] = useState<{
    spectacleId: Id<"spectacles">;
    representationIndex: number;
  } | null>(null);

  // Trouver le spectacle et la représentation sélectionnés
  const spectacleSelectionne = spectacles?.find(
    (s) => s._id === selection?.spectacleId
  );
  const representationSelectionnee =
    selection !== null
      ? spectacleSelectionne?.representations?.[selection.representationIndex]
      : undefined;

  return (
    <div>
      {/* En-tête de page */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className="font-display font-black text-3xl text-encre"
          style={{ fontFamily: "var(--font-fraunces, Fraunces, serif)" }}
        >
          Réservations
        </h1>
      </div>

      {/* Chargement */}
      {spectacles === undefined && (
        <div className="text-center py-20 text-encre-douce">Chargement…</div>
      )}

      {/* Aucun spectacle */}
      {spectacles !== undefined && spectacles.length === 0 && (
        <div className="bg-creme-pale border-2 border-encre rounded-xl p-10 text-center shadow-card">
          <div className="text-5xl mb-3">🎭</div>
          <p className="text-lg font-bold text-encre mb-2">
            Aucun spectacle disponible.
          </p>
          <p className="text-sm text-encre-douce">
            Créez d'abord un spectacle avec ses représentations.
          </p>
        </div>
      )}

      {/* Mise en page 2 colonnes */}
      {spectacles !== undefined && spectacles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* Panneau gauche — liste spectacles/représentations */}
          <div className="flex flex-col gap-3">
            {spectacles.map((spectacle) => {
              const representations = spectacle.representations ?? [];
              return (
                <div
                  key={spectacle._id}
                  className="bg-creme-pale border-2 border-encre rounded-xl overflow-hidden shadow-card"
                >
                  {/* Titre spectacle */}
                  <div className="px-4 py-3 bg-creme-deep border-b-2 border-encre">
                    <h2
                      className="font-bold text-base text-encre"
                      style={{
                        fontFamily: "var(--font-fraunces, Fraunces, serif)",
                      }}
                    >
                      {spectacle.titre}
                    </h2>
                    <p className="text-xs text-encre-douce">{spectacle.saison}</p>
                  </div>

                  {/* Liste des représentations */}
                  {representations.length === 0 && (
                    <div className="px-4 py-3 text-xs text-encre-douce italic">
                      Aucune représentation
                    </div>
                  )}
                  {representations.map((rep, idx) => {
                    const isSelected =
                      selection?.spectacleId === spectacle._id &&
                      selection?.representationIndex === idx;
                    return (
                      <RepresentationItem
                        key={idx}
                        rep={rep}
                        spectacleId={spectacle._id}
                        representationIndex={idx}
                        isSelected={isSelected}
                        onSelect={() =>
                          setSelection({
                            spectacleId: spectacle._id,
                            representationIndex: idx,
                          })
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Panneau droit — détail */}
          <div>
            {!selection || !representationSelectionnee ? (
              <div className="bg-creme-pale border-2 border-dashed border-encre-douce rounded-xl p-12 text-center shadow-card">
                <Users size={40} className="text-encre-soft mx-auto mb-3" />
                <p className="text-lg font-bold text-encre mb-2">
                  Sélectionnez une représentation
                </p>
                <p className="text-sm text-encre-douce">
                  Cliquez sur une représentation à gauche pour voir et gérer ses réservations.
                </p>
              </div>
            ) : (
              <PanneauDetail
                key={`${selection.spectacleId}-${selection.representationIndex}`}
                spectacleTitre={spectacleSelectionne!.titre}
                representation={representationSelectionnee}
                spectacleId={selection.spectacleId}
                representationIndex={selection.representationIndex}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Sous-composant : item de représentation dans le panneau gauche
// Utilise useQuery pour compter les places en temps réel
function RepresentationItem({
  rep,
  spectacleId,
  representationIndex,
  isSelected,
  onSelect,
}: {
  rep: Representation;
  spectacleId: Id<"spectacles">;
  representationIndex: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const reservations = useQuery(api.reservations.list, {
    spectacleId,
    representationIndex,
  }) as Reservation[] | undefined;

  // Calculer places réservées localement (hors annulées)
  const placesReservees =
    reservations
      ?.filter((r) => r.statut !== "annule")
      .reduce((sum, r) => sum + r.nbPlaces, 0) ?? 0;

  const placesTotal = rep.places;
  const estComplet = placesReservees >= placesTotal;

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 border-b border-encre-soft last:border-b-0 transition-colors
        ${isSelected ? "bg-encre text-creme-pale" : "hover:bg-creme-deep text-encre"}`}
    >
      <div>
        <div className={`text-sm font-bold ${isSelected ? "text-creme-pale" : "text-encre"}`}>
          {rep.date} · {rep.heure}
        </div>
        <div className={`text-xs ${isSelected ? "text-creme" : "text-encre-douce"}`}>
          {rep.lieu}
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border
            ${estComplet
              ? "bg-red-100 text-red-700 border-red-300"
              : isSelected
              ? "bg-creme/20 text-creme border-creme/40"
              : "bg-creme-deep text-encre-douce border-encre-soft"
            }`}
        >
          {reservations === undefined ? "…" : `${placesReservees}/${placesTotal}`}
        </span>
        <ChevronRight size={14} className={isSelected ? "text-creme" : "text-encre-douce"} />
      </div>
    </button>
  );
}
